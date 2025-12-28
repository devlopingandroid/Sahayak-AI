import asyncio
import edge_tts
import tempfile
import os
import pygame
import time

class VoiceEngine:
    def __init__(self):
        self.voice = "en-US-AriaNeural"
        self.rate = "+0%"
        self.volume = "+0%"
        self.last_spoken = ""

        pygame.mixer.init()

    async def _generate_and_play(self, text):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as f:
            audio_file = f.name

        communicate = edge_tts.Communicate(
            text=text,
            voice=self.voice,
            rate=self.rate,
            volume=self.volume
        )

        await communicate.save(audio_file)

        pygame.mixer.music.load(audio_file)
        pygame.mixer.music.play()

        while pygame.mixer.music.get_busy():
            time.sleep(0.1)

        pygame.mixer.music.unload()
        os.remove(audio_file)

    def speak(self, text):
        if not text or text == self.last_spoken:
            return

        self.last_spoken = text
        print("🎧 Speaking:", text)
        asyncio.run(self._generate_and_play(text))
