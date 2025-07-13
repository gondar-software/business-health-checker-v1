from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    
class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class UserData(UserBase):
    id: int
    
    model_config = {"from_attributes": True}

class VerificationCode(UserBase):
    code: int
    password: Optional[str]

class Token(BaseModel):
    token: str