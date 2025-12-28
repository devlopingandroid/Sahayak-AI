import numpy
import cv2
import torch
import clip
from facenet_pytorch import InceptionResnetV1, MTCNN

print("NumPy:", numpy.__version__)
print("OpenCV:", cv2.__version__)
print("Torch:", torch.__version__)
print("CLIP: OK")
print("FaceNet: OK")
