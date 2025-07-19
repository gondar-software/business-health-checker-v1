from fastapi import APIRouter, Depends, HTTPException
from src.services import AssessorService
from src.dependencies import (
    get_current_user
)
from src.schemas import UserInfo, AssessorOut

assessors_router = APIRouter()

@assessors_router.get("/", response_model=list[AssessorOut])
async def get_assessors(
    user: UserInfo = Depends(get_current_user),
    service: AssessorService = Depends(AssessorService)
):
    try:
        assessors = await service.get_assessors_by_user_id(user.id)
        return [AssessorOut.model_validate(assessor) for assessor in assessors]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )