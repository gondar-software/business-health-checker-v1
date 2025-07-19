from passlib.context import CryptContext
from cryptography.fernet import Fernet
from src.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
fernet = Fernet(settings.FERNET_SECRET_KEY)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def encrypt_invitation_param(email: str, customer_id: int) -> str:
    data = f"{email}:{customer_id}".encode()
    encrypted = fernet.encrypt(data)
    return encrypted.decode()

def decrypt_invitation_param(encrypted_param: str) -> tuple[str, int]:
    decrypted = fernet.decrypt(encrypted_param.encode())
    email, customer_id = decrypted.decode().split(":")
    return email, int(customer_id)