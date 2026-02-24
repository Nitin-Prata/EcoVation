# DOCS Referred -> https://ai.google.dev/gemini-api/docs/text-generation?lang=python
# API Keys and Playground for Gemini -> https://aistudio.google.com/app/apikey

import os
import warnings
from dotenv import load_dotenv

warnings.filterwarnings("ignore", message=".*google.generativeai.*", category=FutureWarning)
import google.generativeai as genai
import PIL.Image

from tavily import TavilyClient, UsageLimitExceededError

from typing import List

import json

import time

# Load variables from the .env file
load_dotenv()


# paths
image_media = "media/images/"
video_media = "media/videos/"


# binding the API to authenticate (add GEMINI_API_KEY to .env)
_api_key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY') or ''
genai.configure(api_key=_api_key or 'placeholder')


# model used - gemini-2.5-flash-lite has best free tier (15 RPM, 1000 RPD). Override with GEMINI_MODEL in .env.
_model_name = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash-lite")
model = genai.GenerativeModel(_model_name)
model_pro = genai.GenerativeModel(_model_name)

# initializing Tavily Client (optional - product scan works without it, but web search won't)
_tavily_key = os.environ.get('TAVILY_API_KEY')
tavily_client = TavilyClient(api_key=_tavily_key) if _tavily_key else None


# response generated - used only for New Python Version
def responseGemini(response):
    """
    Used to extract text response from a Gemini Response Object.
    """
    return response.parts[0].text


def textInput(model: genai.GenerativeModel, query: str, versionNew: bool = False) -> str | bool:
    """
    Used to give text-input and get text-output from Gemini.
    """
    try:
        response = model.generate_content(query)
        return responseGemini(response) if versionNew else response.text
    except:
        return False


def imageInput(model: genai.GenerativeModel, query: str, image_names: List[str], versionNew: bool = False) -> str | bool:
    """
    Used to give text-input and image-inputs and get text-output from Gemini.
    """
    try:
        images_opened = [PIL.Image.open(image_media + name) for name in image_names]
        response = model.generate_content([query] + images_opened)
        return responseGemini(response) if versionNew else response.text
    except:
        return False


# under testing -> have to explore, can be used only for older python version like 3.10
def streamResponse(model: genai.GenerativeModel, query: str) -> None:
    """
    To Stream and get fast responses Chunk wise constantly in equal intervals
    """
    model = genai.GenerativeModel(_model_name)
    response = model.generate_content("Write a story about a magic backpack.", stream=True)
    for chunk in response:
        print(chunk.text)
        print("_" * 80)


# using Tavily search - for real-time contextual reference
def tavilySearch(query: str, tavily_client: TavilyClient = tavily_client) -> str:
    try:
        if not tavily_client:
            return []
        # Step1 - tavily_client has already been loaded
        # Step 2. Executing a search query
        responses = tavily_client.search(
            query,
            search_depth='advanced',
            max_results=4
            )

        # Step 3. Return the results
        # return [eval(response) for response in responses]
        return [response['content'] for response in responses['results']]
    
    except UsageLimitExceededError:
        return False


# Enum - choosing one option from All
def enumOutput(model: genai.GenerativeModel, query: str, image_names: List[str], enum_values: List[str], versionNew: bool = False):
    try:
        images_opened = [PIL.Image.open(image_media + name) for name in image_names]
        # response = model.generate_content([query + '. Don\'t use markdown format for generating response.'] + images_opened)
        response = model.generate_content(
            [query] + images_opened,
            generation_config=genai.GenerationConfig(
                response_mime_type="text/x.enum",
                response_schema={
                    "type": "STRING",
                    "enum": enum_values # ["Percussion", "String", "Woodwind", "Brass", "Keyboard"],
                },
            ),
        )
        return responseGemini(response) if versionNew else response.text
    except:
        return False

# Giving Output Format to prompt
def getOutPutInFormat(model: genai.GenerativeModel, query: str, image_names: List[str], output_type, versionNew: bool = False):
    try:
        images_opened = [PIL.Image.open(image_media + name) for name in image_names]
        result = model.generate_content(
        [query] + images_opened,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json", response_schema=output_type
        ),
        )
        return responseGemini(result) if versionNew else result.text
    except:
        return False


def _get_file_ext(path: str) -> str:
    return path.lower().rsplit(".", 1)[-1] if "." in path else ""


def typeDocInputNOutputFormat(model: genai.GenerativeModel, query: str, output_type, report_path: str = "media/reports/temp.pdf"):
    """Process image/video/file and get structured JSON. Uses PIL for images (no upload_file needed)."""
    try:
        if not os.path.exists(report_path):
            raise FileNotFoundError(f"File not found: {report_path}")

        ext = _get_file_ext(report_path)
        image_exts = {"jpg", "jpeg", "png", "gif", "webp"}

        if ext in image_exts:
            # Use PIL - works without genai.upload_file
            img = PIL.Image.open(report_path)
            response = model.generate_content(
                [query, img],
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json", response_schema=output_type
                ),
            )
            return response.text

        # For PDF/video - try upload_file if available (newer SDK)
        if hasattr(genai, 'upload_file'):
            mime_map = {"pdf": "application/pdf", "mp4": "video/mp4"}
            mime_type = mime_map.get(ext, "application/octet-stream")
            uploaded_file = genai.upload_file(path=report_path, mime_type=mime_type)
            while uploaded_file.state.name == "PROCESSING":
                print('.', end='')
                time.sleep(2)
                uploaded_file = genai.get_file(uploaded_file.name)
            if uploaded_file.state.name == "FAILED":
                raise ValueError(f"File upload failed: {uploaded_file.state.name}")
            response = model.generate_content(
                [query, uploaded_file],
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json", response_schema=output_type
                ),
            )
            return response.text
        else:
            raise ValueError("PDF/video upload requires a newer google-generativeai. For Product Scan, use image (jpg, png).")
    except Exception as e:
        print(f"typeDocInputNOutputFormat error: {e}")
        raise


'''
import enum
from typing_extensions import TypedDict

class Grade(enum.Enum):
    A_PLUS = "a+"
    A = "a"
    B = "b"
    C = "c"
    D = "d"
    F = "f"

class Recipe(TypedDict):
    recipe_name: str
    grade: Grade

model = genai.GenerativeModel("gemini-1.5-pro-latest")

result = model.generate_content(
    "List about 10 cookie recipes, grade them based on popularity",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[Recipe]
    ),
)
print(result)  # [{"grade": "a+", "recipe_name": "Chocolate Chip Cookies"}, ...]
'''


# Code for making a Simple ChatBot using Gemini
# ------------------------------------------------------------------------------------------

# model = genai.GenerativeModel("gemini-1.5-flash")
# chat = model.start_chat(
#     history=[
#         {"role": "user", "parts": "Hello"},
#         {"role": "model", "parts": "Great to meet you. What would you like to know?"},
#     ]
# )
# response = chat.send_message("I have 2 dogs in my house.")
# print(response.text)
# response = chat.send_message("How many paws are in my house?")
# print(response.text)
# ------------------------------------------------------------------------------------------

if __name__ == '__main__':
    # testing Text Inputs
    # print(
    #   textInput(
    #       model, 
    #       "I'm Amrit, Im great how are you."
    #           )
    # )
    
    # testing Image Inputs
    # print(
    #     imageInput(
    #         model, 
    #         "What's similar in the images fed.", 
    #         ['test-image-1.jpg', 'test-image-2.jpg']
    #         )
    #     )
    
    # testing Stream Response
    # print(
    #     streamResponse(
    #         model,
    #         "How to make Indian Flavored Rissoto"
    # )
    #     )


    # testing Tavily API
    # realtime_context = tavilySearch("average fertility rate in India")
    # print(realtime_context)
    
    # testing Enum
    # print(enumOutput(model, "I earn 100$ in India a month and I love babies and Im married, would it be feasible to have a baby.", [], ['Yes, It would be nice for you to have one.', 'Wouldn\'t Advice having one :(( Right now.']))
    
    # testing output format
    # print(getOutPutInFormat(model, "Generate 15 excercises to help old aged people. Don't Use Mardown Elements while generating response.", [], list[str]))
    
    
    # print(model.generate_content(['What is the report about', sample_pdf]).text)
    
    # print(typeDocInputNOutputFormat(model, "tell what's in the doc", list[str]))
    ...