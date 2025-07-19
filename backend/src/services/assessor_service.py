from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.repositories import (
    AssessorRepository,
    CustomerRepository,
    UserRepository
)
from src.schemas import AssessorOut


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

        user_ids = [assessor.user_id for assessor in assessors]
        users = await self.user_repository.get_users_by_ids(user_ids)
        user_map = {user.id: user for user in users}

        assessor_out_list = []
        for assessor in assessors:
            user = user_map.get(assessor.user_id)
            if user:
                assessor_out = AssessorOut(
                    id=assessor.id,
                    user_id=assessor.user_id,
                    customer_id=assessor.customer_id,
                    email=user.email
                )
                assessor_out_list.append(assessor_out)

        return assessor_out_list
