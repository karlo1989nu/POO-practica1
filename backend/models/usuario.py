class Usuario:
    def __init__(self, username, password):
        self.username = username
        self._password = password

    def autenticar(self, pwd):
        return self._password == pwd


class Moderador(Usuario):
    def autenticar(self, pwd):
        if not pwd.startswith("mod_"):
            return False
        return super().autenticar(pwd)


class Admin(Usuario):
    def autenticar(self, pwd):
        if not any(char in "@#&!" for char in pwd):
            return False
        return super().autenticar(pwd)


def login(usuario: Usuario, pwd: str) -> bool:
    return usuario.autenticar(pwd)
    