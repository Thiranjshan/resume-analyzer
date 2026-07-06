import re

REQUIRED_SECTIONS = ["experience", "education", "skills"]

def compute_ats_score(cleaned_text: str, raw_text: str) -> int:
    score = 0
    sections_found = sum(1 for s in REQUIRED_SECTIONS if s in cleaned_text)
    score += (sections_found / len(REQUIRED_SECTIONS)) * 30

    has_email = bool(re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", raw_text))
    has_phone = bool(re.search(r"(\+?\d[\d\-\s]{7,}\d)", raw_text))
    score += 10 if has_email else 0
    score += 10 if has_phone else 0

    word_count = len(cleaned_text.split())
    if 200 <= word_count <= 1200:
        score += 20
    elif word_count > 0:
        score += 10

    action_verbs = ["led", "built", "designed", "developed", "improved", "managed", "created"]
    verb_hits = sum(1 for v in action_verbs if v in cleaned_text)
    score += min(verb_hits * 3, 15)
    score += 15 if word_count > 20 else 0
    return round(min(score, 100))