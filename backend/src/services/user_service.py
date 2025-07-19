from fastapi import HTTPException
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import User
from src.cache import verification_cache
from src.schemas import (
    UserCreate, 
    UserData, 
    UserInfo,
    UserBase, 
    VerificationCode, 
    UserLogin, 
    Token, 
    CustomerOut, 
    AssessorOut
)
from src.db.repositories import (
    UserRepository, 
    CustomerRepository, 
    AssessorRepository
)
from src.core import (
    get_password_hash, 
    verify_password
)
from src.smtp import (
    send_verification_email_for_create_account, 
    send_verification_email_for_reset_password
)

from .jwt_service import create_access_token

class UserService:
    def __init__(self, db: AsyncSession):
        self.user_repository = UserRepository(db)
        self.customer_repository = CustomerRepository(db)
        self.assessor_repository = AssessorRepository(db)

    async def create_user(self, user_data: UserCreate) -> UserData:
        existing_user = await self.user_repository.get_by_email(user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = get_password_hash(user_data.password)
        new_user = User(email=user_data.email, hashed_password=hashed_password)
        new_user = await self.user_repository.add_new_user(new_user)
        
        return UserInfo.model_validate(new_user)
    
    async def login_user(self, user_data: UserLogin) -> Token:
        existing_user = await self.user_repository.get_by_email(user_data.email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")

        logined = verify_password(user_data.password, existing_user.hashed_password)
        if not logined:
            raise HTTPException(status_code=401, detail="Password is not correct")
        else:
            return create_access_token(UserInfo.model_validate(existing_user).dict())

    async def get_token_by_google(self, email: str) -> Token:
        existing_user = await self.user_repository.get_by_email(email)
        if not existing_user:
            user_create = UserCreate(email=email, password="")
            existing_user = await self.create_user(user_create)
        else:
            if not verify_password("", existing_user.hashed_password):
                raise HTTPException(status_code=401, detail="Password is incorrect")

        return create_access_token(UserInfo.model_validate(existing_user).dict())

    async def send_code(self, user_data: UserBase, for_create: bool = True):
        if for_create:
            existing_user = await self.user_repository.get_by_email(user_data.email)
            if existing_user:
                raise HTTPException(status_code=400, detail="Email already registered")
        else:
            existing_user = await self.user_repository.get_by_email(user_data.email)
            if not existing_user:
                raise HTTPException(status_code=400, detail="Email not found")

        stored, code = verification_cache.generate_and_store_code(user_data.email)

        if not stored:
            raise HTTPException(status_code=429, detail="Too many verification attempts. Please wait before requesting a new code.")

        try:
            if for_create:
                await run_in_threadpool(
                    send_verification_email_for_create_account,
                    user_data.email,
                    code
                )
            else:
                await run_in_threadpool(
                    send_verification_email_for_reset_password,
                    user_data.email,
                    code
                )
        except:
            raise HTTPException(status_code=500, detail="Failed to send verification email")

    async def verify_code(self, code_data: VerificationCode, for_create: bool = True):
        verified, limited = verification_cache.verify_code(code_data.email, code_data.code)
        if limited:
            raise HTTPException(status_code=429, detail="Too many verification attempts. Please resend a new code.")
        if not verified:
            raise HTTPException(status_code=400, detail="Invalid verification code or code has expired")

        if for_create:
            if not code_data.password:
                raise HTTPException(status_code=400, detail="Password is required for user creation")
            user_create = UserCreate(email=code_data.email, password=code_data.password)
            new_user = await self.create_user(user_create)
            new_token = create_access_token(UserInfo.model_validate(new_user).dict())
            return new_token
        else:
            return
        
    async def reset_password(self, user_data: UserLogin):
        existing_user = await self.user_repository.get_by_email(user_data.email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")

        if verify_password(user_data.password, existing_user.hashed_password):
            raise HTTPException(status_code=400, detail="New password cannot be the same as the old password")

        hashed_password = get_password_hash(user_data.password)
        await self.user_repository.update_password(existing_user, hashed_password)
        
        return

    async def get_user_data(self, email: str) -> UserData:
        existing_user = await self.user_repository.get_by_email(email)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        user_data = UserData.model_validate(existing_user)

        customer = await self.customer_repository.get_customer_by_user_id(existing_user.id)
        if customer:
            user_data.customer = CustomerOut.model_validate(customer)

        assessors = await self.assessor_repository.get_assessors_by_user_id(existing_user.id)
        user_data.assessors = [AssessorOut.model_validate(assessor) for assessor in assessors]

        return user_data