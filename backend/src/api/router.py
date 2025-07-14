from fastapi import APIRouter
from src.api.endpoints import users_router, infos_router

api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(infos_router, prefix="/infos", tags=["infos"])