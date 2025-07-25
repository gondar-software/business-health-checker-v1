from fastapi import HTTPException
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.repositories import (
    AssessorRepository,
    CustomerRepository,
    UserRepository
)
from src.db.models import Assessor
from src.schemas import AssessorOut, AssessorCreate, CustomerBase, AssessorBase
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
        me = await self.user_repository.get_user_by_id(user_id)
        if not me:
            raise HTTPException(status_code=404, detail="User not found")
        elif me.email == assessor_info.email:
            raise HTTPException(status_code=400, detail="You cannot invite yourself as an assessor")

        customer = await self.customer_repository.get_customer_by_user_id(user_id)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")

        existing_assessor = await self.assessor_repository.get_assessor_by_email_and_customer_id(
            assessor_info.email, customer.id
        )
        if existing_assessor:
            raise HTTPException(status_code=400, detail="Assessor with this email already exists")

        encrypted_param = encrypt_invitation_param(assessor_info.email, customer.id)
        invitation_url = f"{settings.PROJECT_URL}/accept-invite?param={encrypted_param}"
        await run_in_threadpool(
            send_assessor_invitation_email,
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

    async def delete_assessor(self, assessor_id: int):
        assessor = await self.assessor_repository.get_assessor_by_id(assessor_id)
        if not assessor:
            raise HTTPException(status_code=404, detail="Assessor not found")

        await self.assessor_repository.delete_assessor(assessor)

    async def check_invitation(self, email: str, param: str):
        try:
            decrypted_email, customer_id = decrypt_invitation_param(param)
        except Exception as _:
            raise HTTPException(status_code=400, detail="Invalid invitation parameter")

        if email != decrypted_email:
            raise HTTPException(status_code=400, detail="Email does not match invitation")

        customer = await self.customer_repository.get_customer_by_id(customer_id)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")

        existing_assessor = await self.assessor_repository.get_assessor_by_email_and_customer_id(email, customer.id)
        if not existing_assessor:
            raise HTTPException(status_code=404, detail="Assessor not found")
        if not existing_assessor.pending:
            raise HTTPException(status_code=400, detail="Assessor already accepted this invitation")

    async def delete_assessor_by_param(self, email: str, param: str):
        try:
            decrypted_email, customer_id = decrypt_invitation_param(param)
        except Exception as _:
            raise HTTPException(status_code=400, detail="Invalid invitation parameter")

        if email != decrypted_email:
            raise HTTPException(status_code=400, detail="Email does not match invitation")

        customer = await self.customer_repository.get_customer_by_id(customer_id)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")

        existing_assessor = await self.assessor_repository.get_assessor_by_email_and_customer_id(email, customer.id)
        if not existing_assessor:
            raise HTTPException(status_code=404, detail="Assessor not found")
        if not existing_assessor.pending:
            raise HTTPException(status_code=400, detail="Assessor already accepted this invitation")
        await self.assessor_repository.delete_assessor(existing_assessor)

    async def accept_invitation(self, email: str, param: str, assessor: AssessorBase):
        try:
            decrypted_email, customer_id = decrypt_invitation_param(param)
        except Exception as _:
            raise HTTPException(status_code=400, detail="Invalid invitation parameter")

        if email != decrypted_email:
            raise HTTPException(status_code=400, detail="Email does not match invitation")

        customer = await self.customer_repository.get_customer_by_id(customer_id)
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")

        existing_assessor = await self.assessor_repository.get_assessor_by_email_and_customer_id(email, customer.id)
        if not existing_assessor or not existing_assessor.pending:
            raise HTTPException(status_code=400, detail="Assessor already accepted this invitation")
        
        user = await self.user_repository.get_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        existing_assessor.pending = False
        existing_assessor.name = assessor.name
        existing_assessor.role = assessor.role
        existing_assessor.user_id = user.id
        updated_assessor = await self.assessor_repository.update_assessor(existing_assessor)
        if not updated_assessor:
            raise HTTPException(status_code=400, detail="Failed to update assessor")