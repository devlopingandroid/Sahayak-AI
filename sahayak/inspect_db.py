import numpy as np

db = np.load("person_db.npy", allow_pickle=True).item()
print("People:", list(db.keys()))
for k,v in db.items():
    print(k, "embeddings:", len(v))
