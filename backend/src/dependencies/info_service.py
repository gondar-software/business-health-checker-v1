from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.services import InfoService
from src.db import get_db

def get_info_service(db: AsyncSession = Depends(get_db)) -> InfoService:
    return InfoService(db)