PLACEMENT_THRESHOLD = 5  # frames

def should_create_episode(obj_data):
    return obj_data["seen_count"] == PLACEMENT_THRESHOLD
