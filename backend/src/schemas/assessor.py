from pydantic import BaseModel

class AssessorBase(BaseModel):
    name: str
    role: str

class AssessorOut(AssessorBase):
    email: str
    id: int

    model_config = { "from_attributes": True }