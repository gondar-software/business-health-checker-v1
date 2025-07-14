from fastapi import APIRouter, Depends, HTTPException
from src.services import InfoService
from src.schemas import UserData, InfoBase, InfoOut
from src.dependencies import get_current_user

infos_router = APIRouter()

@infos_router.get("/", response_model=InfoOut)
async def get_info(
    user_data: UserData = Depends(get_current_user),
    info_service: InfoService = Depends(InfoService)
):
    """
    Get information for the current user.
    """
    try:
        return await info_service.get_info_by_user(user_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@infos_router.post("/")
async def create_info(
    info_data: InfoBase,
    user_data: UserData = Depends(get_current_user),
    info_service: InfoService = Depends(InfoService)
):
    """
    Create information for the current user.
    """
    try:
        return await info_service.create_info(user_data, info_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@infos_router.put("/")
async def update_info(
    info_data: InfoBase,
    user_data: UserData = Depends(get_current_user),
    info_service: InfoService = Depends(InfoService)
):
    """
    Update information for the current user.
    """
    try:
        return await info_service.update_info(user_data, info_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))