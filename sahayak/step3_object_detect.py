import cv2
from ultralytics import YOLO
from collections import deque

# -------------------------------
# CONFIG
# -------------------------------
WINDOW_SIZE = 5      # last 5 frames
MIN_CONFIRM = 4      # 5 me se 4 same hone chahiye
CONF_THRESHOLD = 0.5

# -------------------------------
# STABILIZER CLASS
# -------------------------------
class DetectionStabilizer:
    def __init__(self, window_size, min_confirm):
        self.history = deque(maxlen=window_size)
        self.min_confirm = min_confirm

    def update(self, label):
        self.history.append(label)

        if len(self.history) < self.history.maxlen:
            return None

        last_label = self.history[-1]
        count = self.history.count(last_label)

        if count >= self.min_confirm:
            return last_label
        return None


# -------------------------------
# LOAD YOLO
# -------------------------------
model = YOLO("yolov8n.pt")
stabilizer = DetectionStabilizer(WINDOW_SIZE, MIN_CONFIRM)

# -------------------------------
# CAMERA INPUT (IP WEBCAM)
# -------------------------------
url = "http://192.168.1.26:8080/video"  # apna IP
cap = cv2.VideoCapture(url)

if not cap.isOpened():
    print("❌ Camera open nahi hua")
    exit()

print("✅ Camera + YOLO + Stabilizer ready")

# -------------------------------
# MAIN LOOP
# -------------------------------
while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, (640, 480))

    # YOLO inference
    results = model(frame, conf=CONF_THRESHOLD)

    current_label = None

    # ---- Pick most confident detection (MVP logic) ----
    if len(results[0].boxes) > 0:
        box = results[0].boxes[0]
        cls_id = int(box.cls[0])
        current_label = model.names[cls_id]

    # ---- Stabilization logic ----
    confirmed_label = None
    if current_label:
        confirmed_label = stabilizer.update(current_label)

    # ---- Draw results ----
    annotated_frame = results[0].plot()

    if confirmed_label:
        cv2.putText(
            annotated_frame,
            f"CONFIRMED: {confirmed_label}",
            (30, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            3
        )
        print(f"🧠 MEMORY CONFIRMED: {confirmed_label}")
    elif current_label:
        cv2.putText(
            annotated_frame,
            f"Detecting: {current_label}",
            (30, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 255),
            2
        )

    cv2.imshow("Sahayak Eye - Stable Detection", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# -------------------------------
# CLEANUP
# -------------------------------
cap.release()
cv2.destroyAllWindows()
