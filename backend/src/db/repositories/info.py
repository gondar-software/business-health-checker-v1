from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.models import Info

class InfoRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_info_by_user_id(self, user_id: int) -> Info | None:
        stmt = select(Info).where(Info.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def create_info(self, info: Info) -> Info:
        try:
            self.db.add(info)
            await self.db.commit()
            await self.db.refresh(info)
            return info
        except Exception as e:
            await self.db.rollback()
            raise e
        
    async def update_info(self, user_id: int, info_data: dict) -> Info:
        info = await self.get_info_by_user_id(user_id)
        if not info:
            raise ValueError("No info found for the user id")

        for key, value in info_data.items():
            setattr(info, key, value)

        try:
            self.db.add(info)
            await self.db.commit()
            await self.db.refresh(info)
            return info
        except Exception as e:
            await self.db.rollback()
            raise e

    async def delete_info(self, user_id: int) -> None:
        info = await self.get_info_by_user_id(user_id)
        if info:
            await self.db.delete(info)
            await self.db.commit()
        else:
            raise ValueError("No info found for the user id")