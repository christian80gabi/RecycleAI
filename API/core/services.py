import contextlib
import env
import json
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.utils.crypto import get_random_string
from django.contrib.auth.models import Group, Permission, User
from django.contrib.auth import authenticate, login, logout


def sign_in(request: HttpRequest) -> JsonResponse:
    """API sign in func

    Args:
        request (HttpRequest): the received request

    Returns:
        response (JsonResponse)
    """

    response: JsonResponse = JsonResponse({})

    try:
        _body: dict = json.loads(request.body)
        email = _body.get('username')
        password = _body.get('password')
        response.status_code = 404

        if account:= authenticate(request=request, username=email, password=password):
            login(request=request, user=account)
            response.status_code = 200
            
    except Exception as e:
        print('Error: registration ->', e)
        response.status_code = 500
    
    return response

def register(request: HttpRequest) -> JsonResponse:
    """API register func

    Args:
        request (HttpRequest): the received request

    Returns:
        response (JsonResponse)
    """

    response: JsonResponse = JsonResponse({})

    try:
        _body: dict = json.loads(request.body)
        email = _body.get('username')
        password = _body.get('password')
        response.status_code = 404

        User.objects.create_user(username=email, email=email, password=password)
        response.status_code = 200
    except Exception as e:
        print('Error: registration ->', e)
        response.status_code = 500
    
    return response


def recommend_waste_company(request: HttpRequest) -> JsonResponse:
    response: JsonResponse = JsonResponse({})

    file = request.FILES['file']

    # If file is image type
    if file and (not file.name.endswith('.png') or not file.name.endswith('.jpg') or not file.name.endswith('.jpeg')):
        response.status_code = 500
        response = JsonResponse({
            'message': 'Not an image.'
        })
        return response
    # If file is too large
    if file.multiple_chunks():
        message = f'Uploaded file is too big ({file.size(1000 * 1000)} MB)'
        response = JsonResponse({
            'message': message 
        })
        return response

    data: dict = handle_uploaded_file(file)

    return JsonResponse(data)


def handle_uploaded_file(f) -> dict:
    file = f.read()

    return {
        'companies': [],
        'waste_type': None,
        'carbo_print': None,
        'earned_point': 0
    }
    