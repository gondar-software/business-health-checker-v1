from fastapi import Request, APIRouter, Depends, HTTPException
from src.services import UserService, google_redirect, get_user_data_from_google_token
from src.schemas import UserLogin, UserData, UserBase, VerificationCode, Token
from src.dependencies import get_user_service, get_current_user

users_router = APIRouter()

@users_router.post("/ccode")
async def send_code_for_create(
    user_data: UserBase,
    user_service: UserService = Depends(get_user_service)
):
    try:
        await user_service.send_code(user_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@users_router.post("/rcode")
async def send_code_for_re_pwd(
    user_data: UserBase,
    user_service: UserService = Depends(get_user_service)
):
    try:
        await user_service.send_code(user_data, for_create=False)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@users_router.post("/vccode", response_model=Token, status_code=201)
async def verify_code_for_create(
    code_data: VerificationCode,
    user_service: UserService = Depends(get_user_service)
):
    try:
        return await user_service.verify_code(code_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@users_router.post("/vrcode")
async def verify_code_for_re_pwd(
    code_data: VerificationCode,
    user_service: UserService = Depends(get_user_service)
):
    try:
        await user_service.verify_code(code_data, for_create=False)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@users_router.get("/")
async def get_user(
    user: UserData = Depends(get_current_user)
):
    return user

@users_router.post("/login", response_model=Token)
async def login(
    user_data: UserLogin, 
    user_service: UserService = Depends(get_user_service)
):
    try:
        return await user_service.login_user(user_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@users_router.get("/google/login")
async def login_with_google(
    request: Request
):
    try:
        return await google_redirect(request)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@users_router.get("/google/signup")
async def signup_with_google(
    request: Request
):
    try:
        return await google_redirect(request, login=False)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@users_router.get("/google", response_model=Token)
async def get_user_by_google(
    request: Request,
    user_service: UserService = Depends(get_user_service)
):
    try:
        user_data = await get_user_data_from_google_token(request)
        token = await user_service.get_token_by_google(user_data["email"])
        return token
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )