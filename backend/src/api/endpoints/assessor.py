from fastapi import APIRouter, Depends, HTTPException
from src.services import AssessorService
from src.dependencies import (
    get_current_user,
    get_assessor_service
)
from src.schemas import UserInfo, AssessorOut

assessors_router = APIRouter()

@assessors_router.get("/", response_model=list[AssessorOut])
async def get_assessors(
    user: UserInfo = Depends(get_current_user),
    service: AssessorService = Depends(get_assessor_service)
):
    try:
        return await service.get_assessors_by_user_id(user.id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )