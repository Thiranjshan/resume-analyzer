ROLE_SKILLS = {
    "frontend developer": ["javascript", "typescript", "react", "html", "css", "git", "tailwind"],
    "backend developer": ["python", "node.js", "express", "sql", "postgresql", "docker", "git"],
    "data analyst": ["python", "sql", "excel", "communication", "problem solving"],
}

def compare_with_role(extracted_skills: list[str], job_role: str) -> dict:
    role_key = job_role.strip().lower()
    expected = ROLE_SKILLS.get(role_key, [])
    matched = [s for s in expected if s in extracted_skills]
    missing = [s for s in expected if s not in extracted_skills]
    extra = [s for s in extracted_skills if s not in expected]
    match_percentage = round((len(matched) / len(expected)) * 100) if expected else 0
    skills_labeled = (
        [{"name": s, "type": "matched"} for s in matched]
        + [{"name": s, "type": "missing"} for s in missing]
        + [{"name": s, "type": "extra"} for s in extra]
    )
    return {"matched": matched, "missing": missing, "extra": extra,
            "match_percentage": match_percentage, "skills_labeled": skills_labeled}