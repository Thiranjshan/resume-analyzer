def generate_recommendations(gap: dict, ats_score: int) -> list[dict]:
    recs = []
    for skill in gap["missing"][:5]:
        recs.append({
            "title": f"Add experience with {skill}",
            "description": f"This role commonly expects {skill}. Consider adding a project or bullet point that demonstrates it.",
        })
    if ats_score < 60:
        recs.append({
            "title": "Improve ATS compatibility",
            "description": "Add clear section headers (Experience, Education, Skills) and ensure your contact details are easy to find.",
        })
    if not recs:
        recs.append({"title": "Strong match", "description": "Your resume aligns well with this role."})
    return recs