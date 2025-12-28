import cv2
from ultralytics import YOLO

IMPORTANT_CLASSES = ["bottle", "cell phone", "cup", "book"]

model = YOLO("yolov8n.pt")

url = "http://192.168.1.26:8080/video"
cap = cv2.VideoCapture(url)

print("Camera opened:", cap.isOpened())

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, (640, 480))

    results = model.track(
        frame,
        persist=True,
        conf=0.3,
        iou=0.6,
        tracker="bytetrack.yaml"
    )

    annotated = frame.copy()

    if results and results[0].boxes is not None:
        for box in results[0].boxes:
            if box.id is None:
                continue

            cls_id = int(box.cls[0])
            label = model.names[cls_id]

            # 🔥 FILTER
            if label not in IMPORTANT_CLASSES:
                continue

            x1, y1, x2, y2 = map(int, box.xyxy[0])
            track_id = int(box.id[0])

            cv2.rectangle(annotated, (x1, y1), (x2, y2), (0,255,0), 2)
            cv2.putText(
                annotated,
                f"{label} | ID:{track_id}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0,255,0),
                2
            )

    cv2.imshow("TRACKING (FILTERED)", annotated)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
