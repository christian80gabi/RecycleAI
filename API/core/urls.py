from django.urls import path
from core import views

VERSION = '1.0'

app_name = 'core'
urlpatterns = [
    # Globals | Company URL
    # -----------------------------------------------------------------------------------------------------------------
    path(f'{VERSION}/register', views.register, name="register"),
    path(f'{VERSION}/sign-in', views.sign_in, name='sign-in'),
    path(f'{VERSION}/analyze-picture', views.recommend_waste_company, name='analyze-picture'),
]
