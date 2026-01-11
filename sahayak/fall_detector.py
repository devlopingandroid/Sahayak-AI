from collections import deque

class FallDetector:
    def __init__(self, buffer_size=10, fall_threshold_frames=5):
        """
        Args:
            buffer_size (int): Number of frames to keep history for.
            fall_threshold_frames (int): How many frames must show 'fallen' state to trigger alert.
        """
        self.history = deque(maxlen=buffer_size)
        self.fall_threshold_frames = fall_threshold_frames
        self.is_fallen = False

    def detect(self, xyxy):
        """
        Analyzes bounding box to detect potential fall.
        Args:
            xyxy (list): [x1, y1, x2, y2] coordinates.
        Returns:
            bool: True if fall is detected, False otherwise.
        """
        x1, y1, x2, y2 = map(int, xyxy)
        width = x2 - x1
        height = y2 - y1

        if height == 0 or width == 0:
            return False

        aspect_ratio = width / height

        # HEURISTIC:
        # If Width > Height * 1.2, it is horizontal (likely fallen)
        # Normal standing person has Height > Width
        is_horizontal = aspect_ratio > 1.2

        self.history.append(is_horizontal)

        # Confirm fall only if majority of recent frames show horizontal
        fallen_count = sum(self.history)
        
        if fallen_count >= self.fall_threshold_frames:
            self.is_fallen = True
        else:
            self.is_fallen = False

        return self.is_fallen
