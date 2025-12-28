import whisper
import sounddevice as sd
import numpy as np
import scipy.signal

# ---------------- CONFIG ----------------
MIC_DEVICE_INDEX = 15        # Laptop mic
MIC_SAMPLE_RATE = 48000     # Native Windows mic rate
WHISPER_SAMPLE_RATE = 16000
DURATION = 5                # seconds

print("🔁 Loading Whisper model (small)...")
model = whisper.load_model("small")

print("🎤 Speak English clearly...")

def listen():
    # Record audio at 48kHz
    audio = sd.rec(
        int(DURATION * MIC_SAMPLE_RATE),
        samplerate=MIC_SAMPLE_RATE,
        channels=1,
        dtype="float32",
        device=MIC_DEVICE_INDEX
    )
    sd.wait()

    audio = np.squeeze(audio)

    
    audio_16k = scipy.signal.resample_poly(
        audio,
        WHISPER_SAMPLE_RATE,
        MIC_SAMPLE_RATE
    )

    # Transcribe
    result = model.transcribe(audio_16k, language="en", fp16=False)
    text = result["text"].strip()

    print("🗣️ Recognized:", text)
    return text

if __name__ == "__main__":
    while True:
        listen()
