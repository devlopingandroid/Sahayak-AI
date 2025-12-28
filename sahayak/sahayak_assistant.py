from query_engine import QueryEngine
from episodic_memory import EpisodicMemory
from voice_engine import VoiceEngine
from speech_to_text_whisper import listen

# -------------------------------
# INIT SYSTEMS
# -------------------------------
memory = EpisodicMemory()
query_engine = QueryEngine(memory)
voice = VoiceEngine()

# -------------------------------
# DEMO MEMORY (remove later)
# -------------------------------
memory.add_episode(
    object_uid="obj_1",
    object_name="glasses",
    location="sofa",
    person="Mishu"
)

print("🧠 Sahayak is live. Speak English clearly.")
print("🎤 Example: 'Where are my glasses?'")

# -------------------------------
# MAIN LOOP
# -------------------------------
while True:
    query = listen()

    if not query or len(query.strip()) < 3:
        continue

    answer = query_engine.answer(query)
    print("🤖", answer)

    voice.speak(answer)
