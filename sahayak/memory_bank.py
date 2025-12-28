import numpy as np
from datetime import datetime

class MemoryBank:
    def __init__(self, threshold=0.85):
        self.threshold = threshold
        self.objects = {}  # uid -> dict

    @staticmethod
    def cosine_sim(a, b):
        return float(np.dot(a, b.T))

    def match_or_create(self, embedding):
        # Try to match with existing objects
        for uid, data in self.objects.items():
            sim = self.cosine_sim(embedding, data["embedding"])
            if sim >= self.threshold:
                data["last_seen"] = datetime.now()
                data["seen_count"] += 1
                return uid, sim

        # Else create new object
        uid = f"obj_{len(self.objects)+1}"
        self.objects[uid] = {
            "embedding": embedding,
            "first_seen": datetime.now(),
            "last_seen": datetime.now(),
            "seen_count": 1
        }
        return uid, 1.0
