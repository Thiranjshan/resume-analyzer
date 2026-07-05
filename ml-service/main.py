from fastapi import FastAPI, UploadFile, Form

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(resume: UploadFile, job_role: str = Form(...)):
    # hardcoded response for now — real logic comes in Phase 4
    return {
        "atsScore": 75,
        "resumeScore": 70,
        "skills": [{"name": "python", "type": "matched"}],
        "recommendations": [{"title": "Add more detail", "description": "Placeholder recommendation."}],
    }