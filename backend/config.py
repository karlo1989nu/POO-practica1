import datetime

JWT_SECRET_KEY = 'tu_clave_secreta'
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(hours=1)
SQLALCHEMY_DATABASE_URI = 'sqlite:///libros.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False