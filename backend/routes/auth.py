import jwt
import datetime
from flask import make_response
from flask import current_app, Blueprint, request, jsonify, abort
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.usuario import Usuario, Moderador, Admin, login as login_func

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

# Simulación de base de datos en memoria
usuarios = {}

def generate_token(username):
    token = jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + current_app.config['JWT_ACCESS_TOKEN_EXPIRES']
    }, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')
    return token

@auth_bp.route('/register/', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    rol = data.get('rol', 'usuario')
    if not username or not password:
        return make_response(jsonify({"error": "Faltan datos"}), 400)
    if username in usuarios:
        return make_response(jsonify({"error": "Usuario ya existe"}), 400)
    # Validación de contraseña según el rol
    if rol == "admin":
        if not any(char in "@#&!" for char in password):
            return make_response(jsonify({"error": "La contraseña de admin debe contener al menos uno de estos caracteres: @ # & !"}), 400)
    usuarios[username] = {
        "password": generate_password_hash(password),
        "rol": rol
    }
    return jsonify({"msg": "Usuario creado"}), 201

@auth_bp.route('/login/', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    rol = data.get('rol', 'usuario')
    user = usuarios.get(username)
    if not user or not check_password_hash(user["password"], password) or user["rol"] != rol:
        return jsonify({"message": "Credenciales incorrectas."}), 401

    # Puedes usar tus clases Usuario, Moderador, Admin si quieres lógica extra
    if rol == 'admin':
        user_obj = Admin(username, password)
    elif rol == 'moderador':
        user_obj = Moderador(username, password)
    else:
        user_obj = Usuario(username, password)

    if not login_func(user_obj, password):
        return jsonify({"message": "Credenciales incorrectas."}), 401

    token = generate_token(username)
    return jsonify({"token": token}), 200

@auth_bp.route('/protected-resource/', methods=['GET'])
def protected_resource():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"message": "Token requerido"}), 401
    token = auth_header.split(' ')[1]
    try:
        payload = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        return jsonify({"data": f"Hola, {payload['username']}! Recurso protegido."})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Token inválido"}), 401