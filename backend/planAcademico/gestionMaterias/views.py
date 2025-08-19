# gestionMaterias/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
import json

@csrf_exempt
def home(request):
    return JsonResponse({"message": "Bienvenido a la API de gestionMaterias"})

@csrf_exempt
def register_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password1 = data.get("password1")
            password2 = data.get("password2")

            if password1 != password2:
                return JsonResponse({"success": False, "error": "Las contraseñas no coinciden"}, status=400)

            from django.contrib.auth.models import User
            if User.objects.filter(username=username).exists():
                return JsonResponse({"success": False, "error": "Usuario ya existe"}, status=400)

            user = User.objects.create_user(username=username, password=password1)
            login(request, user)
            return JsonResponse({"success": True, "username": user.username})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)
    return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True, "username": user.username})
        else:
            return JsonResponse({"success": False, "error": "Credenciales inválidas"}, status=400)
    return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
def logout_view(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"success": True})
    return JsonResponse({"error": "Método no permitido"}, status=405)
