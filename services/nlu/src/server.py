from fastapi import FastAPI
from fastapi import APIRouter
from typing import Union
from starlette import status
from starlette.requests import Request
from starlette.responses import Response

from schemas.config_model import Config


app = FastAPI()


@app.post("/train")
async def train(config: Config):
    return config


@app.post("/process")
async def process(chatbotId: str, text: str):
    return
