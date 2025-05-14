from libro import Libro
from inventario import Inventario
from usuario import Usuario, Moderador, Admin, login

# Prueba 1: Crear un libro con precio válido
try:
    libro1 = Libro("El Principito", "Antoine de Saint-Exupéry", 15.99, 10)
    print(f"Libro creado: {libro1.titulo}, {libro1.autor}, ${libro1.precio}, Stock: {libro1.stock}")
except ValueError as e:
    print(f"Error al crear libro: {e}")

# Prueba 2: Crear un libro con precio negativo (debe fallar)
try:
    libro2 = Libro("Libro Inválido", "Autor Desconocido", -5.99, 5)
except ValueError as e:
    print(f"Error esperado al crear libro con precio negativo: {e}")

# Prueba 3: Agregar libros al inventario y buscar por título exacto
inventario = Inventario()
inventario.agregar_libro(libro1)

# Agregar más libros
libro3 = Libro("Cien Años de Soledad", "Gabriel García Márquez", 20.00, 5)
libro4 = Libro("1984", "George Orwell", 12.50, 8)
inventario.agregar_libro(libro3)
inventario.agregar_libro(libro4)

# Buscar libros por título
buscado = inventario.buscar_libro("Cien Años de Soledad")
if buscado:
    print(f"Libro encontrado: {buscado.titulo}, {buscado.autor}, ${buscado.precio}, Stock: {buscado.stock}")
else:
    print("Libro no encontrado")

# Buscar un libro que no existe
buscado = inventario.buscar_libro("Libro Inexistente")
if buscado:
    print(f"Libro encontrado: {buscado.titulo}")
else:
    print("Libro no encontrado (como se esperaba)")

# Prueba 1: Usuario normal
usuario = Usuario("user1", "password123")
print(login(usuario, "password123"))  # True
print(login(usuario, "wrongpass"))    # False

# Prueba 2: Moderador
moderador = Moderador("mod1", "mod_password")
print(login(moderador, "mod_password"))  # True
print(login(moderador, "password123"))   # False
print(login(moderador, "mod_wrong"))     # False

# Prueba 3: Admin
admin = Admin("admin1", "admin@123")
print(login(admin, "admin@123"))  # True
print(login(admin, "admin123"))   # False (falta carácter especial)
print(login(admin, "wrong@123"))  # False (contraseña incorrecta)