from fall_detector import FallDetector
import time

def test_fall_logic():
    print("🧪 Starting Fall Detector Logic Test...\n")
    detector = FallDetector(buffer_size=5, fall_threshold_frames=3)

    # CASE 1: Normal Standing Person (Height > Width)
    # Box: [100, 100, 200, 400] -> Width=100, Height=300, Ratio=0.33
    print("🔹 Testing Standing Person...")
    standing_box = [100, 100, 200, 400]
    
    for i in range(5):
        is_fallen = detector.detect(standing_box)
        state = "FALLEN 🚨" if is_fallen else "Standing ✅"
        print(f"   Frame {i+1}: {state}")
    
    assert detector.is_fallen == False, "❌ Error: Should be standing!"
    print("✅ Case 1 Passed: Correctly identified as standing.\n")

    # CASE 2: Falling Person (Transitioning)
    print("🔹 Testing Transition to Fall...")
    
    # CASE 3: Fallen Person (Width > Height)
    # Box: [100, 300, 400, 400] -> Width=300, Height=100, Ratio=3.0
    fallen_box = [100, 300, 400, 400]

    for i in range(5):
        # We expect it to trigger after 'fall_threshold_frames' (3)
        is_fallen = detector.detect(fallen_box)
        state = "FALLEN 🚨" if is_fallen else "Standing (Buffer)..."
        print(f"   Frame {i+1}: {state}")

    assert detector.is_fallen == True, "❌ Error: Should be detected as fallen!"
    print("✅ Case 3 Passed: Correctly identified as fallen after buffer.\n")

    print("🎉 ALL TESTS PASSED! Logic is working.")

if __name__ == "__main__":
    test_fall_logic()
