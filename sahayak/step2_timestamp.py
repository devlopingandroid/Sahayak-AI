import cv2
from datetime import datetime

url = "http://192.168.1.26:8080/video"
cap = cv2.VideoCapture(url)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, (640, 480))

    # Current time
    timestamp = datetime.now().strftime("%H:%M:%S")

    # Put timestamp on frame
    cv2.putText(
        frame,
        f"Time: {timestamp}",
        (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (0, 255, 0),
        2
    )

    cv2.imshow("Sahayak Eye - Timestamped", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
