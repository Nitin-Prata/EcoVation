"""
DIY Project Generator - Uses Gemini for project generation and image generation.
"""
import os
import json
import base64
import io
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", os.environ.get("GOOGLE_API_KEY")))

router = APIRouter(prefix="/diy", tags=["DIY Generator"])

DIY_PROMPT = """
Based on the provided image of an item, generate DIY project information for three difficulty levels: Easy, Medium, and Hard.

For each level include: DIY_Product, Materials_Required (list of {Material, Quantity}), Steps (list of {Step_Number, Description, Estimated_Time, Safety_Tips}), Difficulty_Level (Level, Explanation), and Image_Generation_Prompt (detailed visual description for image generation).

Return ONLY valid JSON in this exact structure:
{
    "Projects": {
        "Easy": {...},
        "Medium": {...},
        "Hard": {...}
    }
}
"""


def generate_image_gemini(prompt: str) -> str | None:
    """Try Gemini image generation. Returns base64 or None if unavailable on free tier."""
    try:
        model = genai.GenerativeModel(os.environ.get("GEMINI_MODEL", "gemini-2.5-flash-lite"))
        response = model.generate_content(
            f"Create a detailed image of: {prompt}",
            generation_config=genai.GenerationConfig(
                response_modalities=["image", "text"],
            ),
        )
        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data:
                    return base64.b64encode(part.inline_data.data).decode()
    except Exception:
        pass  # Image gen may not be available on free tier
    return None


@router.post("/generate")
async def generate_diy_projects(file: UploadFile = File(...)):
    """Generate DIY projects from uploaded image."""
    try:
        content = await file.read()
        
        # Determine file type and prepare for Gemini
        ext = file.filename.split(".")[-1].lower() if file.filename else "png"
        mime = f"image/{ext}" if ext in ["png", "jpeg", "jpg", "gif", "webp"] else "image/png"
        
        image_part = {"mime_type": mime, "data": content}
        model = genai.GenerativeModel(os.environ.get("GEMINI_MODEL", "gemini-2.5-flash-lite"))
        
        response = model.generate_content([DIY_PROMPT, image_part])
        text = response.text
        
        # Parse JSON - handle markdown code blocks
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()
        
        data = json.loads(text)
        
        # Optionally generate images for each project (may fail on free tier)
        for level in ["Easy", "Medium", "Hard"]:
            if level in data.get("Projects", {}):
                prompt = data["Projects"][level].get("Image_Generation_Prompt", "")
                if prompt:
                    img_b64 = generate_image_gemini(prompt)
                    data["Projects"][level]["generated_image"] = img_b64
        
        return data
    except json.JSONDecodeError as e:
        return JSONResponse(status_code=500, content={"error": f"Invalid JSON from model: {e}"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
