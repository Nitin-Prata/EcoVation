from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from report_processor.processor import router as report_router
from sustainability_agent.agent import router as eco_router
from diy_router import router as diy_router

app = FastAPI(title="EcoVation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(report_router)
app.include_router(eco_router)
app.include_router(diy_router)