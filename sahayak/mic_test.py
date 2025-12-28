import sounddevice as sd
import numpy as np

def callback(indata, frames, time, status):
    print("🎤 Mic input received")

with sd.InputStream(callback=callback):
    print("🎙️ Speak now...")
    sd.sleep(5000)
