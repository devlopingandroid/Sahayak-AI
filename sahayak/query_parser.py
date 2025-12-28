def parse_query(query: str):
    q = query.lower()

    if "kahan" in q or "where" in q:
        return "FIND_OBJECT"

    if "kaun" in q or "who" in q:
        return "IDENTIFY_PERSON"

    if "aaj" in q or "today" in q:
        return "TODAY_EVENTS"

    if "where" in q:
        return "FIND_OBJECT"

    if "this is" in q or "this is my" in q:
        return "CONFIRM_OBJECT"

    if "who is this" in q or "who is" in q:
        return "IDENTIFY_PERSON"
    if "where" in q or "here are" in q or "here is" in q:
        return "FIND_OBJECT"

    return "UNKNOWN"
