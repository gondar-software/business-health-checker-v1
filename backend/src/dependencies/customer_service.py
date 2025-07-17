from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.services import CustomerService
from src.db import get_db

def get_customer_service(db: AsyncSession = Depends(get_db)) -> CustomerService:
    return CustomerService(db)