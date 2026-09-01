const express = require('express');
const { usuarios, adicionarUsuario } = require('./data');

const app = express();
const PORT = 3000;

// Permite receber JSON
app.use(express.json());

// POST - Cadastrar
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            error: 'Os campos nome e email são obrigatórios.'
        });
    }

    const novoUsuario = adicionarUsuario(nome, email);

    res.status(201).json({
        data: novoUsuario
    });
});

// GET - Listar
app.get('/usuarios', (req, res) => {
    res.status(200).json({
        data: usuarios
    });
});

// GET - Buscar por ID
app.get('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            error: 'Usuário não encontrado.'
        });
    }

    res.status(200).json({
        data: usuario
    });
});

// PUT - Atualizar
app.put('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: 'Usuário não encontrado.'
        });
    }

    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            error: 'Os campos nome e email são obrigatórios.'
        });
    }

    usuarios[indice].nome = nome;
    usuarios[indice].email = email;

    res.status(200).json({
        data: usuarios[indice]
    });
});

// DELETE - Excluir
app.delete('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: 'Usuário não encontrado.'
        });
    }

    usuarios.splice(indice, 1);

    res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});