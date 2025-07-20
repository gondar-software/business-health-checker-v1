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

    async def get_assessors_by_customer_id(self, customer_id: int) -> list[Assessor]:
        stmt = select(Assessor).where(Assessor.customer_id == customer_id)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_assessor_by_email_and_customer_id(self, email: str, customer_id: int) -> Assessor:
        stmt = select(Assessor).where(Assessor.email == email, Assessor.customer_id == customer_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def create_assessor(self, assessor: Assessor) -> Assessor:
        try:
            self.db.add(assessor)
            await self.db.commit()
            await self.db.refresh(assessor)
            return assessor
        except Exception as e:
            await self.db.rollback()
            raise e

    async def get_assessor_by_id(self, assessor_id: int) -> Assessor:
        stmt = select(Assessor).where(Assessor.id == assessor_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def delete_assessor(self, assessor: Assessor):
        try:
            await self.db.delete(assessor)
            await self.db.commit()
        except Exception as e:
            await self.db.rollback()
            raise e

    async def update_assessor(self, assessor: Assessor) -> Assessor:
        try:
            self.db.add(assessor)
            await self.db.commit()
            await self.db.refresh(assessor)
            return assessor
        except Exception as e:  
            await self.db.rollback()
            raise e