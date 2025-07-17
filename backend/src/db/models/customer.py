from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    logo_url: Mapped[str] = mapped_column(String, nullable=True)
    name: Mapped[str] = mapped_column(String)
    sector: Mapped[str] = mapped_column(String)
    industry: Mapped[str] = mapped_column(String)
    size: Mapped[str] = mapped_column(String)
    turnover: Mapped[str] = mapped_column(String)

    user_id: Mapped[int] = mapped_column(Integer, nullable=True)