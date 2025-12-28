import pyttsx3

engine = pyttsx3.init()

engine.setProperty("rate", 150)     # speed (120–160 is calm)
engine.setProperty("volume", 1.0)   # max volume

engine.say("Namaste. Main Sahayak hoon.")
engine.runAndWait()
