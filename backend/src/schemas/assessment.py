from pydantic import BaseModel
from datetime import datetime

class AssessmentBase(BaseModel):
    area: str
    dimension: str
    question: str
    score: int
    feedback: str | None = None
    feedback_file: str | None = None
    assessor_id: int | None = None
    customer_id: int | None = None

class AssessmentOut(AssessmentBase):
    id: int
    created_time: datetime

    model_config = { "from_attributes": True }