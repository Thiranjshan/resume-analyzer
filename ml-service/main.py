from fastapi import FastAPI, UploadFile, Form
from preprocessing.extract_text import extract_text
from preprocessing.clean_text import clean_text
from services.skill_extraction import extract_skills
from services.ats_scoring import compute_ats_score
from services.role_matcher import compare_with_role
from recommendation.generator import generate_recommendations

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(resume: UploadFile, job_role: str = Form(...)):
    raw_text = extract_text(resume)
    cleaned = clean_text(raw_text)
    skills = extract_skills(cleaned)
    ats_score = compute_ats_score(cleaned, raw_text)
    gap = compare_with_role(skills, job_role)
    recommendations = generate_recommendations(gap, ats_score)
    resume_score = round((ats_score + gap["match_percentage"]) / 2)
    return {
        "atsScore": ats_score,
        "resumeScore": resume_score,
        "skills": gap["skills_labeled"],
        "recommendations": recommendations,
    }