from sqlalchemy.ext.asyncio import AsyncSession
from src.db.repositories import CustomerRepository
from src.schemas import UserInfo, CustomerBase
from src.db.models import Customer

class CustomerService:
    def __init__(self, db: AsyncSession):
        self.repository = CustomerRepository(db)

    async def create_or_update_customer(self, user_info: UserInfo, customer_data: CustomerBase):
        existing_customer = await self.repository.get_customer_by_user_id(user_info.id)
        if not existing_customer:
            new_customer = Customer(user_id=user_info.id, **customer_data.dict())
            await self.repository.create_customer(new_customer)
        else:
            await self.repository.update_customer(user_info.id, customer_data.dict())