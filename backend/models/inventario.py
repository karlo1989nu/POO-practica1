class Inventario:
    def __init__(self):
        self._libros = []

    def agregar_libro(self, libro):
        self._libros.append(libro)

    def buscar_libro(self, titulo):
        for libro in self._libros:
            if libro.titulo == titulo:
                return libro
        return None

    def registrar_venta(self, titulo, cantidad):
        libro = self.buscar_libro(titulo)
        if libro is None:
            raise ValueError('Libro no encontrado')
        
        if libro.stock < cantidad:
            raise ValueError('Stock insuficiente')
        
        libro.stock -= cantidad
        print(f"Venta registrada: {cantidad} unidades de '{titulo}'")