from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.models import Assessor

class AssessorRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_assessors_by_user_id(self, user_id: int) -> list[Assessor]:
        stmt = select(Assessor).where(Assessor.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalars().all()