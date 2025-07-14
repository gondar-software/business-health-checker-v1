from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.repositories import InfoRepository
from src.schemas import UserData, InfoBase, InfoOut
from src.db.models import Info

class InfoService:
    def __init__(self, db: AsyncSession):
        self.repository = InfoRepository(db)

    async def get_info_by_user(self, user_data: UserData):
        info = await self.repository.get_info_by_user_id(user_data.id)
        if not info:
            raise HTTPException(status_code=404, detail="Info not found for the user")
        return InfoOut.model_validate(info)
    
    async def create_info(self, user_data: UserData, info_data: InfoBase):
        existing_info = await self.repository.get_info_by_user_id(user_data.id)
        if existing_info:
            raise HTTPException(status_code=400, detail="Info already exists for the user")

        new_info = Info(user_id=user_data.id, **info_data.dict())
        await self.repository.create_info(new_info)
    
    async def create_or_update_info(self, user_data: UserData, info_data: InfoBase):
        existing_info = await self.repository.get_info_by_user_id(user_data.id)
        if not existing_info:
            new_info = Info(user_id=user_data.id, **info_data.dict())
            await self.repository.create_info(new_info)
        else:
            info = await self.repository.update_info(user_data.id, info_data.dict())
        if not info:
            raise HTTPException(status_code=404, detail="Info not found for the user")