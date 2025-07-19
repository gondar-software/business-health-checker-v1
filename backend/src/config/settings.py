from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_URL: str = "https://..."
    PROJECT_NAME: str = "Project Name"
    DATABASE_URL: str = "postgresql+asyncpg://user:password@host:port/dbname"
    SERVER_PORT: int = 5002
    EMAIL_ADDRESS: str = "example@gmail.com"
    APP_PASSWORD: str = "xxxx xxxx xxxx xxxx"
    TOKEN_EXPIRE_TIMEOUT: int = 120
    JWT_SECRET: str = "your-secret-key"
    JWT_ALGORITHM: str = "HS256"
    GOOGLE_CLIENT_ID: str = "<your-google-client-id>"
    GOOGLE_CLIENT_SECRET: str = "<your-google-client-secret>"
    SECRET_KEY: str = "<your-secret-key>"
    GOOGLE_LOGIN_REDIRECT_URI: str = "https://..."
    GOOGLE_SIGNUP_REDIRECT_URI: str = "https://..."
    FERNET_SECRET_KEY: str = "fernet-secret-key"
    
    class Config:
        env_file = ".env"

settings = Settings()