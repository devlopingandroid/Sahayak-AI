import cv2
import time
from datetime import datetime
import os

url = "http://192.168.1.26:8080/video"
cap = cv2.VideoCapture(url)

os.makedirs("memory_frames", exist_ok=True)

last_saved = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, (640, 480))
    now = time.time()

    # Save keyframe every 3 seconds
    if now - last_saved >= 3:
        timestamp = datetime.now().strftime("%H-%M-%S")
        filename = f"memory_frames/frame_{timestamp}.jpg"
        cv2.imwrite(filename, frame)
        print(f"🧠 Memory frame saved: {filename}")
        last_saved = now

    cv2.imshow("Sahayak Eye - Memory Builder", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
