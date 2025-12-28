from episodic_memory import EpisodicMemory
from query_engine import QueryEngine
from voice_engine import VoiceEngine

memory = EpisodicMemory()
voice = VoiceEngine()

# Simulate memory
memory.add_episode(
    object_uid="obj_1",
    object_name="glasses",
    location="sofa",
    person="Mishu"
)

engine = QueryEngine(memory)

while True:
    q = input("🗣️ Ask: ")
    answer = engine.answer(q)
    print("🤖", answer)
    voice.speak(answer)
