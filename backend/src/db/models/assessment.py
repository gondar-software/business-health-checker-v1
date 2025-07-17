from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from sqlalchemy import func
from .base import Base

class Assessment(Base):
    __tablename__ = "assessments"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    area: Mapped[str] = mapped_column(String)
    dimension: Mapped[str] = mapped_column(String)
    question: Mapped[str] = mapped_column(String)
    score: Mapped[int] = mapped_column(Integer)
    feedback: Mapped[str] = mapped_column(String, nullable=True)
    feedback_file: Mapped[str] = mapped_column(String, nullable=True)
    created_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    
    assessor_id: Mapped[int] = mapped_column(Integer, nullable=True)
    customer_id: Mapped[int] = mapped_column(Integer, nullable=True)