import spacy
from spacy.matcher import PhraseMatcher

nlp = spacy.load("en_core_web_sm")

SKILL_TAXONOMY = [
    "python", "javascript", "typescript", "react", "node.js", "express",
    "postgresql", "mongodb", "docker", "kubernetes", "aws", "git",
    "fastapi", "django", "flask", "sql", "html", "css", "tailwind",
    "communication", "teamwork", "leadership", "problem solving",
]

matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
patterns = [nlp.make_doc(skill) for skill in SKILL_TAXONOMY]
matcher.add("SKILLS", patterns)

def extract_skills(cleaned_text: str) -> list[str]:
    doc = nlp(cleaned_text)
    matches = matcher(doc)
    found = {doc[start:end].text.lower() for _, start, end in matches}
    return sorted(found)