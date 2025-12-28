import cv2
import torch
import numpy as np
from PIL import Image
from facenet_pytorch import InceptionResnetV1, MTCNN

# -------------------------------
# CONFIG
# -------------------------------
CAMERA_URL = "http://192.168.1.26:8080/video"
THRESHOLD = 0.65   # real-world tuned

# -------------------------------
# MODELS
# -------------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"

mtcnn = MTCNN(
    image_size=160,
    margin=20,
    keep_all=True,      # IMPORTANT: detect all faces
    device=device
)

model = InceptionResnetV1(
    pretrained="vggface2"
).eval().to(device)

# -------------------------------
# LOAD PERSON DATABASE
# -------------------------------
db = np.load("person_db.npy", allow_pickle=True).item()

def recognize_face(face_embedding, threshold=THRESHOLD):
    best_name = "Unknown Person"
    best_sim = 0.0

    for name, ref_embeddings in db.items():
        for ref in ref_embeddings:
            sim = float(np.dot(face_embedding, ref.T))
            if sim > best_sim:
                best_sim = sim
                best_name = name

    if best_sim >= threshold:
        return best_name, best_sim
    return "Unknown Person", best_sim

# -------------------------------
# CAMERA
# -------------------------------
cap = cv2.VideoCapture(CAMERA_URL)

if not cap.isOpened():
    print("❌ Camera open nahi hua")
    exit()

print("✅ Live person recognition started")

# -------------------------------
# MAIN LOOP
# -------------------------------
while True:
    ok, frame = cap.read()
    if not ok:
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect faces
    boxes, _ = mtcnn.detect(rgb)

    if boxes is not None:
        for box in boxes:
            x1, y1, x2, y2 = map(int, box)

            # Crop face safely
            face_crop = rgb[y1:y2, x1:x2]
            if face_crop.size == 0:
                continue

            face_pil = Image.fromarray(face_crop)

            # Get aligned face tensor
            face_tensor = mtcnn(face_pil)
            if face_tensor is None:
                continue

            # Generate embedding
            with torch.no_grad():
                emb = model(face_tensor.unsqueeze(0).to(device))
                emb = emb / emb.norm(dim=1, keepdim=True)
                emb = emb.cpu().numpy()

            # Recognize
            name, sim = recognize_face(emb)

            # Draw results
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                frame,
                f"{name} ({sim:.2f})",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.9,
                (0, 255, 0),
                2
            )

    cv2.imshow("Sahayak — Person Recognition (Stable)", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
