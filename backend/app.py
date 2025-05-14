from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from backend.routes.libros import libros_bp
app.register_blueprint(libros_bp)

app = Flask(__name__)
app.config.from_pyfile('config.py')        #  ← carga SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)                       #  ← crea la conexión y el ORM


if __name__ == '__main__':
    with app.app_context():                #  ← necesario para acceder al contexto de Flask
        db.create_all()                    #  ← crea las tablas definidas en los modelos
    app.run(debug=True)