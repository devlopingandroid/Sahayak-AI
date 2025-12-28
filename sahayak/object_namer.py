import clip
import torch
import numpy as np

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

OBJECT_CANDIDATES = [
    "glasses",
    "water bottle",
    "medicine bottle",
    "cleaning liquid",
    "mobile phone",
    "keys",
    "wallet",
    "book",
    "food item"
]

text_tokens = clip.tokenize(OBJECT_CANDIDATES).to(device)
with torch.no_grad():
    text_features = model.encode_text(text_tokens)
text_features = text_features / text_features.norm(dim=-1, keepdim=True)

def name_object(image_embedding):
    sims = (image_embedding @ text_features.T)[0]
    idx = sims.argmax().item()
    return OBJECT_CANDIDATES[idx], float(sims[idx])
