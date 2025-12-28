from voice_engine import VoiceEngine
import time

v = VoiceEngine()

v.speak("First sentence should play.")
time.sleep(1)

v.speak("Second sentence should also play.")
time.sleep(1)

v.speak("Third sentence confirms everything works.")
