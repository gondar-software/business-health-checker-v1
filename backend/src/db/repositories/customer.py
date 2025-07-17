from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.models import Customer

class CustomerRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_customer_by_user_id(self, user_id: int) -> Customer | None:
        stmt = select(Customer).where(Customer.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def create_customer(self, customer: Customer) -> Customer:
        try:
            self.db.add(customer)
            await self.db.commit()
            await self.db.refresh(customer)
            return customer
        except Exception as e:
            await self.db.rollback()
            raise e
        
    async def update_customer(self, user_id: int, customer_data: dict) -> Customer:
        try:
            stmt = select(Customer).where(Customer.user_id == user_id)
            result = await self.db.execute(stmt)
            customer = result.scalar_one_or_none()
            if not customer:
                raise ValueError("No customer found for the user id")
            
            for key, value in customer_data.items():
                setattr(customer, key, value)
            
            await self.db.commit()
            await self.db.refresh(customer)
            return customer
        except Exception as e:
            await self.db.rollback()
            raise e