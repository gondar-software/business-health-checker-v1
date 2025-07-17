from pydantic import BaseModel

class CustomerBase(BaseModel):
    name: str
    size: str
    sector: str
    industry: str
    turnover: str

class CustomerOut(CustomerBase):
    id: int

    model_config = { "from_attributes": True }