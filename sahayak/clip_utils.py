import clip
import torch
import cv2
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

def get_clip_embedding(frame, bbox):
    x1, y1, x2, y2 = bbox
    crop = frame[y1:y2, x1:x2]
    if crop.size == 0:
        return None

    crop = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
    image = Image.fromarray(crop)
    image_input = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        emb = model.encode_image(image_input)

    emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb.cpu().numpy()
