import cv2

url = "http://192.168.1.26:8080/video"  # apna IP daalo
cap = cv2.VideoCapture(url)

if not cap.isOpened():
    print("❌ IP camera open nahi ho raha")
    exit()

print("✅ Android IP camera connected")

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Frame nahi mila")
        break

    cv2.imshow("Sahayak Eye (Android IP Cam)", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
