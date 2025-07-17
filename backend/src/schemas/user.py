from pydantic import BaseModel, EmailStr
from .customer import CustomerOut
from .assessor import AssessorOut

class UserBase(BaseModel):
    email: EmailStr
    
class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class UserInfo(UserBase):
    id: int

    model_config = {"from_attributes": True}

class UserData(UserBase):
    id: int
    customer: CustomerOut | None = None
    assessors: list[AssessorOut] = []
    
    model_config = {"from_attributes": True}

class VerificationCode(UserBase):
    code: int
    password: str | None = None

class Token(BaseModel):
    token: str