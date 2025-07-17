from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.models import Assessment
from .assessor import AssessorRepository
from .customer import CustomerRepository

class AssessmentRepository:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.assessor_repo = AssessorRepository(db)
        self.customer_repo = CustomerRepository(db)