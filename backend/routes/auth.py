from flask import Blueprint, request, jsonify, abort
from backend.models.usuario import Usuario, Moderador, Admin, login

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/login/', methods=['POST'])
def login_route():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    rol = data.get('rol', 'usuario').lower()

    if not username or not password:
        abort(400, description="Faltan datos")

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