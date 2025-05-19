from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from backend.routes.libros import libros_bp
from backend.routes.auth import auth_bp
from backend.models.libro import db

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_pyfile('config.py')
db.init_app(app)

app.register_blueprint(libros_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)