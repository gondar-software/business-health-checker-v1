from pydantic import BaseModel

class AssessorBase(BaseModel):
    name: str | None
    role: str | None

class AssessorOut(AssessorBase):
    email: str
    id: int
    pending: bool

    model_config = { "from_attributes": True }

class AssessorCreate(BaseModel):
    email: str

class AssessorRegister(AssessorBase):
    param: str