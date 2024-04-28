import contextlib
import env
import json
from django.conf import settings
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from core import services


@csrf_exempt
def register(request: HttpRequest) -> JsonResponse:
    
    response = JsonResponse({})
    
    if request.method == 'POST':
        # is_authorized: bool = services.check_authorization(request)
        response = services.register(request)
    else:
        response.status_code = 405
    
    if request.method == 'GET':
        raise NotImplementedError
    
    return response


@csrf_exempt
def sign_in(request: HttpRequest) -> JsonResponse:
    
    response = JsonResponse({})

    if request.method == 'POST':
        # is_authorized: bool = services.check_authorization(request)
        response = services.sign_in(request)
    else:
        response.status_code = 405
    
    if request.method == 'GET':
        response.status_code = 403
    
    return response


@csrf_exempt
def recommend_waste_company(request: HttpRequest) -> JsonResponse:
    
    response = JsonResponse({})

    if request.method == 'POST':
        # is_authorized: bool = services.check_authorization(request)
        response = services.recommend_waste_company(request)
    else:
        response.status_code = 405
    
    if request.method == 'GET':
        response.status_code = 403
    
    return response


@csrf_exempt
def check_authorization(request: HttpRequest) -> JsonResponse:
    from django.contrib.auth.hashers import make_password, check_password

    token: str = request.headers.get('token')
    r_token: str = None

    response: JsonResponse = JsonResponse({'token': ''})
    response.status_code = 405

    if request.method == 'GET' and token:
        _secret_hash: str = token.replace('secret[', '').replace(']i@amp', '')
        valid: bool = check_password(env.AUTHORIZATION_PASSPHRASE, _secret_hash)
        if valid: 
            r_token: str = f'secret[{ make_password(env.AUTHORIZATION_PASSPHRASE) }]r@amp'
            response = JsonResponse({'token': r_token})
            response.status_code = 200 
        else:
            response.status_code = 403

    return response 
