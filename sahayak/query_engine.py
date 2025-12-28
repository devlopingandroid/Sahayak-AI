from query_parser import parse_query
from keyword_normalizer import normalize_object

class QueryEngine:
    def __init__(self, episodic_memory):
        self.memory = episodic_memory

    def answer(self, query):
        intent = parse_query(query)

        if intent == "FIND_OBJECT":
            obj = normalize_object(query)

            if not obj:
                return "I am not sure which object you are asking about."

            ep = self.memory.find_object(obj)
            if ep:
                return ep["sentence"]
            else:
                return f"I do not remember where your {obj} are."

        if intent == "IDENTIFY_PERSON":
            return "This feature will be available soon."

        return "I did not understand. Please ask again."
