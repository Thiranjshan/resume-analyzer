# ml-service/tests/test_ats_scoring.py
from services.ats_scoring import compute_ats_score

def test_score_penalizes_missing_sections():
    text = "just some random words with no structure"
    score = compute_ats_score(text, text)
    assert score < 50   # a resume with no real structure should score low