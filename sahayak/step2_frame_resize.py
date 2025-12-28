import cv2
from datetime import datetime

url = "http://192.168.1.26:8080/video"  # apna IP
cap = cv2.VideoCapture(url)

if not cap.isOpened():
    print("❌ Camera open nahi hua")
    exit()

print("✅ Camera connected")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Resize frame
    frame_resized = cv2.resize(frame, (640, 480))

    cv2.imshow("Sahayak Eye - Resized", frame_resized)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
