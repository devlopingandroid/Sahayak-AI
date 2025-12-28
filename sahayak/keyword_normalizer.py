from difflib import get_close_matches

# canonical object names
OBJECT_KEYWORDS = {
    "glasses": ["glasses", "classes", "spectacles", "specs"],
    "keys": ["keys", "kiys", "kees"],
    "wallet": ["wallet", "walet"],
}

def normalize_object(query):
    words = query.lower().split()

    for canonical, variants in OBJECT_KEYWORDS.items():
        for w in words:
            match = get_close_matches(w, variants, n=1, cutoff=0.7)
            if match:
                return canonical

    return None
