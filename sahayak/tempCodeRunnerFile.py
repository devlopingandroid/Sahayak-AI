import cv2
import torch
import numpy as np
from facenet_pytorch import InceptionResnetV1, MTCNN

device = "cuda" if torch.cuda.is_available() else "cpu"
mtcnn = MTCNN(image_size=160, margin=20, device=device)
model = InceptionResnetV1(pretrained="vggface2").eval().to(device)

db = np.load("person_db.npy", allow_pickle=True).item()

def recognize(emb, thr=0.75):
    best_name, best_sim = "Unknown Person", 0.0
    for name, refs in db.items():
        for r in refs:
            sim = float(np.dot(emb, r.T))
            if sim > best_sim:
                best_sim, best_name = sim, name
    return (best_name, best_sim) if best_sim >= thr else ("Unknown Person", best_sim)

url = "http://192.168.1.26:8080/video"  # apna IP
cap = cv2.VideoCapture(url)

while True:
    ok, frame = cap.read()
    if not ok: break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face = mtcnn(rgb)
    if face is not None:
        with torch.no_grad():
            emb = model(face.unsqueeze(0).to(device))
            emb = emb / emb.norm(dim=1, keepdim=True)
            emb = emb.cpu().numpy()
        name, sim = recognize(emb)
        cv2.putText(frame, f"{name} ({sim:.2f})", (20,40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)

    cv2.imshow("Sahayak — Person Recognition", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break

cap.release()
cv2.destroyAllWindows()
