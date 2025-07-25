from fastapi import APIRouter
from src.api.endpoints import (
    users_router, 
    customers_router,
    assessors_router
)

api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(customers_router, prefix="/customers", tags=["customers"])
api_router.include_router(assessors_router, prefix="/assessors", tags=["assessors"])