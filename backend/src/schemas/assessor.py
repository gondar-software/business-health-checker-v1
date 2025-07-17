from pydantic import BaseModel

class AssessorBase(BaseModel):
    name: str
    email: str
    role: str

class AssessorOut(AssessorBase):
    id: int

    model_config = { "from_attributes": True }