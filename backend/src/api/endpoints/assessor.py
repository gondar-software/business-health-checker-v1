from fastapi import APIRouter, Depends, HTTPException, Query, Body
from src.services import AssessorService
from src.dependencies import (
    get_current_user,
    get_assessor_service
)
from src.schemas import UserInfo, AssessorOut, AssessorCreate, AssessorBase

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

@assessors_router.post("/invite")
async def send_invitation(
    assessor_info: AssessorCreate,
    user: UserInfo = Depends(get_current_user),
    service: AssessorService = Depends(get_assessor_service)
):
    try:
        await service.send_invitation(assessor_info, user.id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@assessors_router.delete("/{assessor_id}")
async def delete_assessor(
    assessor_id: int,
    _: UserInfo = Depends(get_current_user),
    service: AssessorService = Depends(get_assessor_service)
):
    try:
        await service.delete_assessor(assessor_id)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@assessors_router.get("/check")
async def check_invitation(
    param: str,
    user: UserInfo = Depends(get_current_user),
    service: AssessorService = Depends(get_assessor_service)
):
    try:
        return await service.check_invitation(user.email, param)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@assessors_router.post("/")
async def accept_invitation(
    param: str = Query(..., description="Encrypted parameter containing email and customer ID"),
    assessor: AssessorBase = Body(..., description="Assessor details"),
    user: UserInfo = Depends(get_current_user),
    service: AssessorService = Depends(get_assessor_service)
):
    try:
        return await service.accept_invitation(user.email, param, assessor)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@assessors_router.delete("/")
async def delete_assessor(
    param: str = Query(..., description="Encrypted parameter containing email and customer ID"),
    user: UserInfo = Depends(get_current_user),
    service: AssessorService = Depends(get_assessor_service)
):
    try:
        return await service.delete_assessor_by_param(user.email, param)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )