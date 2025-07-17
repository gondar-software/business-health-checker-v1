from fastapi import APIRouter, Depends, HTTPException
from src.services import CustomerService
from src.schemas import UserInfo, CustomerBase, CustomerOut
from src.dependencies import get_current_user, get_customer_service

customers_router = APIRouter()
    
@customers_router.post("/")
async def create_or_update_customer(
    customer_data: CustomerBase,
    user_info: UserInfo = Depends(get_current_user),
    customer_service: CustomerService = Depends(get_customer_service)
):
    """
    Create or update customer for the current user.
    """
    try:
        await customer_service.create_or_update_customer(user_info, customer_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))