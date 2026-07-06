# ml-service/tests/test_skill_extraction.py
from services.skill_extraction import extract_skills

def test_finds_known_skill():
    assert "python" in extract_skills("experienced python developer")