import contextlib
import env
import json
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.utils.crypto import get_random_string
from django.contrib.auth.models import Group, Permission, User
from django.contrib.auth import authenticate, login, logout, get_user
from core import models
from django.core import serializers
from typing import List


def sign_in(request: HttpRequest) -> JsonResponse:
    """API sign in func

    Args:
        request (HttpRequest): the received request

    Returns:
        response (JsonResponse)
    """

    response: JsonResponse = JsonResponse({})

    try:
        _form: dict = json.loads(request.body)
    except Exception as e:
        _form = request.POST

    try:
        email = _form.get('email')
        password = _form.get('password')
        response.status_code = 404

        print('Email --->', email, password)

        print(get_user(request))

        if account:= authenticate(username=email, password=password):
            print('Account.....', account)

            login(request=request, user=account)
            response.status_code = 200

            response = JsonResponse({
                'message': 'Successfully connected!',
                'user': serializers.serialize('json', [account])
            })
            
    except Exception as e:
        print('Error: registration ->', e)
        response.status_code = 500
        response = JsonResponse({
            'message': f'Error: {e}',
            'user': None
        })
    
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
        _form: dict = json.loads(request.body)
    except Exception as e:
        _form = request.POST

    try:
        email = _form.get('email')
        password = _form.get('password')
        firstname = _form.get('firstname')
        lastname = _form.get('lastname')

        account = User.objects.create_user(username=email, email=email, password=password)

        if firstname or lastname:
            account.first_name = firstname
            account.last_name = lastname
            account.save()

        if account: models.UserProfile(user=account).save

        response.status_code = 201
        response = JsonResponse({
            'message': 'Successfully created!'
        })
    except Exception as e:
        print('Error: registration ->', e)
        response.status_code = 403
        response = JsonResponse({
            'message': str(e)
        })
    
    return response


def process_image(request: HttpRequest) -> JsonResponse:
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
    material = 'OTHER'

    with contextlib.suppress(Exception):
        file = f.read()
        # TODO: Do something with the image

    companies = data_by_material_type(material)

    return {
        'companies': serializers.serialize('json', companies),
        'waste_type': material,
        'carbo_print': None,
        'earned_point': models.PointByMaterialCategory._point
    }


def data_by_material_type(material: str) -> List[models.Company]:
    _companies = []

    companies = models.Company.objects.all()
    if material in models.MaterialCategory._values:
        _companies.extend(
            company
            for company in companies
            if material in company.categories_verbose
        )
    return _companies