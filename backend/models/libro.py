from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Libro:
    def __init__(self, titulo, autor, precio, stock):
        self.__titulo = titulo
        self.__autor = autor
        self.__precio = precio
        self.__stock = stock

    @property
    def titulo(self):
        return self.__titulo

    @property
    def autor(self):
        return self.__autor

    @property
    def precio(self):
        return self.__precio

    @precio.setter
    def precio(self, valor):
        if valor < 0:
            raise ValueError('Precio negativo')
        self.__precio = valor

    @property
    def stock(self):
        return self.__stock

    @stock.setter
    def stock(self, valor):
        if valor < 0:
            raise ValueError('Stock negativo')
        self.__stock = valor


class LibroModel(db.Model):
    __tablename__ = 'libros'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    autor = db.Column(db.String(255), nullable=False)
    precio = db.Column(db.Float, nullable=False)

    def __init__(self, titulo, autor, precio):
        self.titulo = titulo
        self.autor = autor
        self.precio = precio