from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Assessor(Base):
    __tablename__ = "assessors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, index=True)
    role: Mapped[str] = mapped_column(String, index=True)
    
    user_id: Mapped[int] = mapped_column(Integer, nullable=True)
    customer_id: Mapped[int] = mapped_column(Integer, nullable=True)