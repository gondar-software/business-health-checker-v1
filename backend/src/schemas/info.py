from pydantic import BaseModel

class InfoBase(BaseModel):
    name: str
    size: str
    sector: str
    industry: str
    turnover: str

class InfoOut(InfoBase):
    id: int

    model_config = { "from_attributes": True }