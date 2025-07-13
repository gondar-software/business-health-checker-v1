from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.services import UserService
from src.db import get_db

def get_user_service(db: AsyncSession = Depends(get_db)) -> UserService:
    return UserService(db)