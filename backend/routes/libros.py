from flask import Blueprint, jsonify, request, abort
from backend.models.libro import LibroModel, db

libros_bp = Blueprint('libros', __name__, url_prefix='/api/libros')

# GET /api/libros: devuelve todos en JSON
@libros_bp.route('/', methods=['GET'])
def get_libros():
    libros = LibroModel.query.all()
    return jsonify([{
        'id': libro.id,
        'titulo': libro.titulo,
        'autor': libro.autor,
        'precio': libro.precio
    } for libro in libros])

# POST /api/libros: recibe {titulo, autor, precio} y crea registro
@libros_bp.route('/', methods=['POST'])
def create_libro():
    data = request.get_json()
    titulo = data.get('titulo')
    autor = data.get('autor')
    precio = data.get('precio')

    if precio is None or precio < 0:
        abort(400, description="El precio debe ser mayor o igual a 0")

    nuevo_libro = LibroModel(titulo=titulo, autor=autor, precio=precio)
    db.session.add(nuevo_libro)
    db.session.commit()
    return jsonify({'id': nuevo_libro.id, 'titulo': nuevo_libro.titulo, 'autor': nuevo_libro.autor, 'precio': nuevo_libro.precio}), 201

# GET /api/libros/<int:id>: devuelve uno o 404
@libros_bp.route('/<int:id>', methods=['GET'])
def get_libro(id):
    libro = LibroModel.query.get_or_404(id)
    return jsonify({'id': libro.id, 'titulo': libro.titulo, 'autor': libro.autor, 'precio': libro.precio})

# PUT /api/libros/<int:id>: actualiza precio
@libros_bp.route('/<int:id>', methods=['PUT'])
def update_libro(id):
    libro = LibroModel.query.get_or_404(id)
    data = request.get_json()
    precio = data.get('precio')

    if precio is None or precio < 0:
        abort(400, description="El precio debe ser mayor o igual a 0")

    libro.precio = precio
    db.session.commit()
    return jsonify({'id': libro.id, 'titulo': libro.titulo, 'autor': libro.autor, 'precio': libro.precio})

# DELETE /api/libros/<int:id>: elimina registro
@libros_bp.route('/<int:id>', methods=['DELETE'])
def delete_libro(id):
    libro = LibroModel.query.get_or_404(id)
    db.session.delete(libro)
    db.session.commit()
    return jsonify({'message': f'Libro con id {id} eliminado'}), 200