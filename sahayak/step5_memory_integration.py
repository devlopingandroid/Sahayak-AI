import cv2
from ultralytics import YOLO

from clip_utils import get_clip_embedding
from memory_bank import MemoryBank

# STEP 7 imports
from episodic_memory import EpisodicMemory
from memory_trigger import should_create_episode

# -------------------------------
# CONFIG
# -------------------------------
CAMERA_URL = "http://192.168.1.26:8080/video"
FRAME_SIZE = (640, 480)

# -------------------------------
# MODELS
# -------------------------------
yolo = YOLO("yolov8n.pt")

# -------------------------------
# MEMORY SYSTEMS
# -------------------------------
object_memory = MemoryBank(threshold=0.85)
episodic_memory = EpisodicMemory()

# -------------------------------
# CAMERA
# -------------------------------
cap = cv2.VideoCapture(CAMERA_URL)

if not cap.isOpened():
    print("❌ Camera open nahi hua")
    exit()

print("✅ Camera + YOLO + CLIP + MEMORY ready")

# -------------------------------
# MAIN LOOP
# -------------------------------
while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, FRAME_SIZE)
    display = frame.copy()

    # YOLO tracking
    results = yolo.track(
        frame,
        persist=True,
        conf=0.3,
        iou=0.6,
        tracker="bytetrack.yaml"
    )

    if results and results[0].boxes is not None:
        for box in results[0].boxes:
            if box.id is None:
                continue

            # Bounding box
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # -------------------------------
            # STEP 5: CLIP EMBEDDING
            # -------------------------------
            embedding = get_clip_embedding(frame, (x1, y1, x2, y2))
            if embedding is None:
                continue

            # Match / create object identity
            uid, similarity = object_memory.match_or_create(embedding)
            obj_data = object_memory.objects[uid]

            # -------------------------------
            # STEP 7: EPISODIC MEMORY TRIGGER
            # -------------------------------
            if should_create_episode(obj_data):
                # TEMP placeholders (we’ll improve in Step 8)
                object_name = "object"          # from object_namer later
                location = "unknown location"   # scene logic later
                person_nearby = "none"           # from face recognition

                episode = episodic_memory.add_episode(
                    object_uid=uid,
                    object_name=object_name,
                    location=location,
                    person=person_nearby
                )

                print("🧠 MEMORY CREATED →", episode["sentence"])

            # -------------------------------
            # DRAW
            # -------------------------------
            cv2.rectangle(display, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                display,
                f"{uid} | sim:{similarity:.2f}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

    cv2.imshow("Sahayak Eye — Memory Mode", display)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
