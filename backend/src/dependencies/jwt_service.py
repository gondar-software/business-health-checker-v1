from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from src.schemas import oauth2_scheme, UserData
from src.config import settings

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        
        required_fields = ["email", "id"]
        if not all(field in payload for field in required_fields):
            raise credentials_exception
            
        return UserData(
            email=payload["email"],
            id=payload["id"]
        )
    except (JWTError, ValueError):
        raise credentials_exception