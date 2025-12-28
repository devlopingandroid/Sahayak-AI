from datetime import datetime

class EpisodicMemory:
    def __init__(self):
        self.episodes = []

    def add_episode(self, object_uid, object_name,
                    location="unknown",
                    person="none"):
        time = datetime.now().strftime("%I:%M %p")

        sentence = self._build_sentence(
            object_name, location, person, time
        )

        episode = {
            "object_uid": object_uid,
            "object_name": object_name,
            "location": location,
            "person": person,
            "time": time,
            "sentence": sentence
        }

        self.episodes.append(episode)
        return episode

    def _build_sentence(self, obj, loc, person, time):
        if person != "none":
            return f"Aapne {obj} {loc} par rakhe the jab {person} paas thi. ({time})"
        else:
            return f"Aapne {obj} {loc} par rakhe the. ({time})"

    def get_last_episode(self, object_name):
        for ep in reversed(self.episodes):
            if ep["object_name"] == object_name:
                return ep
        return None

    def find_object(self, object_name):
        for ep in reversed(self.episodes):
            if ep["object_name"] == object_name:
                return ep
        return None
