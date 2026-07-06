import pdfplumber
import docx
from fastapi import UploadFile
import io

def extract_text(file: UploadFile) -> str:
    content = file.file.read()
    filename = file.filename.lower()
    print("Filename:", file.filename)
    print("Content-Type:", file.content_type)

    if filename.endswith(".pdf"):
        text = ""
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                text += (page.extract_text() or "") + "\n"
        return text
    elif filename.endswith(".docx"):
        doc = docx.Document(io.BytesIO(content))
        return "\n".join(p.text for p in doc.paragraphs)
    raise ValueError("Unsupported file type. Please upload PDF or DOCX.")   