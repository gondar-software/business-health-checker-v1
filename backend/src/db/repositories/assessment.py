from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.models import Assessment
from .assessor import AssessorRepository
from .customer import InfoRepository

class AssessmentRepository:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.assessor_repo = AssessorRepository(db)
        self.info_repo = InfoRepository(db)

    async def get_assessments_by_user_id(self, user_id: int) -> list[Assessment]:
        customer = await self.info_repo.get_info_by_user_id(user_id)
        if not customer:
            return []
        assessors = await self.assessor_repo.get_assessors_by_customer_id(customer.id)
        if not assessors:
            return []
        stmt = select(Assessment).where(Assessment.assessor_id.in_([assessor.id for assessor in assessors]))
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def create_assessment(self, assessment: Assessment) -> Assessment:
        try:
            self.db.add(assessment)
            await self.db.commit()
            await self.db.refresh(assessment)
            return assessment
        except Exception as e:
            await self.db.rollback()
            raise e
        
    async def delete_assessment(self, assessment_id: int) -> None:
        try:
            stmt = select(Assessment).where(Assessment.id == assessment_id)
            result = await self.db.execute(stmt)
            assessment = result.scalar_one_or_none()
            if assessment:
                await self.db.delete(assessment)
                await self.db.commit()
            else:
                raise ValueError("No assessment found for the id")
        except Exception as e:
            await self.db.rollback()
            raise e