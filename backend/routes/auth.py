from flask import Blueprint, request, jsonify, abort
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.usuario import Usuario, Moderador, Admin, login

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

# Simulación de base de datos en memoria
usuarios = {}

@auth_bp.route('/register/', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    rol = data.get('rol', 'usuario')
    if not username or not password:
        abort(400, description="Faltan datos")
    if username in usuarios:
        abort(400, description="Usuario ya existe")
    usuarios[username] = generate_password_hash(password)
    return jsonify({"msg": "Usuario creado"}), 201

@auth_bp.route('/login/', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username not in usuarios or not check_password_hash(usuarios[username], password):
        abort(401, description="Credenciales inválidas")
    return jsonify({"token": "fake-jwt"}), 200

@auth_bp.route('/login/', methods=['POST'])
def login_route():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    rol = data.get('rol', 'usuario').lower()

    if rol == 'admin':
        user = Admin(username, password)
    elif rol == 'moderador':
        user = Moderador(username, password)
    else:
        user = Usuario(username, password)

    if login(user, password):
        return jsonify({'token': 'fake-jwt'})
    else:
        abort(401, description="Credenciales inválidas")