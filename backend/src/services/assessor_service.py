from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.repositories import (
    AssessorRepository,
    CustomerRepository,
    UserRepository
)
from src.db.models import Assessor
from src.schemas import AssessorOut, AssessorCreate, CustomerBase
from src.core import encrypt_invitation_param, decrypt_invitation_param
from src.smtp import send_assessor_invitation_email
from src.config import settings


class AssessorService:
    def __init__(self, db: AsyncSession):
        self.assessor_repository = AssessorRepository(db)
        self.customer_repository = CustomerRepository(db)
        self.user_repository = UserRepository(db)

    async def get_assessors_by_user_id(self, user_id: int) -> list[AssessorOut]:
        customer = await self.customer_repository.get_customer_by_user_id(user_id)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")

        assessors = await self.assessor_repository.get_assessors_by_customer_id(customer.id)
        if not assessors:
            return []
            
        return [AssessorOut.model_validate(assessor) for assessor in assessors]

    async def send_invitation(self, assessor_info: AssessorCreate, user_id: int):
        customer = await self.customer_repository.get_customer_by_user_id(user_id)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")

        existing_assessor = await self.assessor_repository.get_assessor_by_email_and_customer_id(
            assessor_info.email, customer.id
        )
        if existing_assessor:
            raise HTTPException(status_code=400, detail="Assessor with this email already exists")

        encrypted_param = encrypt_invitation_param(assessor_info.email, customer.id)
        invitation_url = f"{settings.PROJECT_URL}/assessors/accept-invite?param={encrypted_param}"
        send_assessor_invitation_email(
            assessor_info.email,
            invitation_url,
            CustomerBase.model_validate(customer).dict()
        )
        
        new_assessor = Assessor(
            email=assessor_info.email,
            customer_id=customer.id
        )
        assessor = await self.assessor_repository.create_assessor(new_assessor)
        if not assessor:
            raise HTTPException(status_code=400, detail="Failed to create assessor")