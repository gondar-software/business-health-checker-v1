from fastapi import Request, HTTPException
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.config import Config
from src.config import settings

config_data = {
    'GOOGLE_CLIENT_ID': settings.GOOGLE_CLIENT_ID,
    'GOOGLE_CLIENT_SECRET': settings.GOOGLE_CLIENT_SECRET
}
starlette_config = Config(environ=config_data)
oauth = OAuth(starlette_config)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

async def google_redirect(request: Request, login=True):
    redirect_uri = settings.GOOGLE_LOGIN_REDIRECT_URI if login else settings.GOOGLE_SIGNUP_REDIRECT_URI
    return await oauth.google.authorize_redirect(request, redirect_uri)

async def get_user_data_from_google_token(request: Request):
    try:
        access_token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        raise HTTPException(
            status_code=401,
            detail="Your google token is not correct"
        )
    
    return access_token["userinfo"]