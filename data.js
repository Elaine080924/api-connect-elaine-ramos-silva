const usuarios = [];

let proximoId = 1;

function adicionarUsuario(nome, email) {
    const usuario = {
        id: proximoId++,
        nome: nome,
        email: email
    };

    usuarios.push(usuario);

    return usuario;
}

module.exports = {
    usuarios,
    adicionarUsuario
};
