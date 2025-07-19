from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.services import AssessorService
from src.db import get_db

def get_assessor_service(db: AsyncSession = Depends(get_db)) -> AssessorService:
    return AssessorService(db)