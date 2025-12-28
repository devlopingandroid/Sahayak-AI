import os
import torch
import numpy as np
from PIL import Image
from facenet_pytorch import InceptionResnetV1, MTCNN

device = "cuda" if torch.cuda.is_available() else "cpu"

# Face detector + embedder
mtcnn = MTCNN(image_size=160, margin=20, device=device)
model = InceptionResnetV1(pretrained="vggface2").eval().to(device)

person_db = {}  # name -> list of embeddings

BASE_DIR = "person_db"

for person_name in os.listdir(BASE_DIR):
    person_path = os.path.join(BASE_DIR, person_name)
    if not os.path.isdir(person_path):
        continue

    embeddings = []

    for img_file in os.listdir(person_path):
        img_path = os.path.join(person_path, img_file)
        img = Image.open(img_path).convert("RGB")

        face = mtcnn(img)
        if face is None:
            print(f"❌ Face not found in {img_path}")
            continue

        with torch.no_grad():
            emb = model(face.unsqueeze(0).to(device))
            emb = emb / emb.norm(dim=1, keepdim=True)
            embeddings.append(emb.cpu().numpy())

    if embeddings:
        person_db[person_name] = embeddings
        print(f"✅ Added {person_name} ({len(embeddings)} photos)")

# Save database
np.save("person_db.npy", person_db)
print("🎉 Person database saved as person_db.npy")
