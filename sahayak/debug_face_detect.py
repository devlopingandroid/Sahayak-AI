from facenet_pytorch import MTCNN
from PIL import Image
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
mtcnn = MTCNN(image_size=160, margin=20, device=device)

img = Image.open("C:\\Users\\tanis\\Desktop\\sahayak\\person_db\\Mishu_Sister\\1.jpeg").convert("RGB")
face = mtcnn(img)

print("Face detected:", face is not None)
