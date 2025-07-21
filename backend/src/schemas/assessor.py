from pydantic import BaseModel
from .customer import CustomerOut

class AssessorBase(BaseModel):
    name: str | None
    role: str | None

class AssessorOut(AssessorBase):
    email: str
    id: int
    pending: bool
    customer_id: int | None = None
    customer: CustomerOut | None = None

    model_config = { "from_attributes": True }

class AssessorCreate(BaseModel):
    email: str

class AssessorRegister(AssessorBase):
    param: str