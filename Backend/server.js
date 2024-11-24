import openDb from './src/configDb.js'; 
import express from 'express';
import cors from 'cors';
import {insertLivro, getLivros, deleteLivro, updateLivro} from './src/controller/Livro.js';
import { getUsuarios, insertUsuario } from './src/controller/Usuario.js';

const app = express();
const port = 3000;


openDb();
//createTable();

// Configura o banco de dados SQLite
// const db = new sqlite3.Database("Backend/database.sqlite", (err) => {
//     if (err) console.error("Erro ao conectar ao banco de dados:", err);
//     else console.log("Banco de dados conectado.");
// });

app.use(express.json());

app.use(cors())


/*
CRUD - 
Create = POST, X
Read = GET, X
Update = PUT, 
Delete = DELETE X
*/


/////////// Rotas para a tabela Livro ///////////
// Rota para listar todos os livros
app.get('/livros', async (req, res) => {
    let livros;
    try {
        livros = await getLivros();
        res.json({ data: livros });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros', error: error.message });
    }
});

// Rota para adicionar um novo livro
app.post('/livros', async (req, res) => {
    let livro;
    try {
        livro = req.body;
        await insertLivro(livro);
        res.json({ message: 'Livro inserido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir livro', error: error.message });
    }
});

// Rota para atualizar um livro
app.put('/livros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const livro = req.body;
        await updateLivro(id, livro);
        res.json({ message: 'Livro atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar livro', error: error.message });
    }
});

// Rota para deletar um livro
app.delete("/livros/:id", async (req, res) => {;
    try {
        const { id } = req.params;
        await deleteLivro(id);
        res.json({ message: 'Livro deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar livro', error: error.message });
    }
});


/////////// Rotas para a tabela Usuario ///////////

app.get('/usuarios', async (req, res) => {
    const usuario = await getUsuarios();
    res.json({ data: usuario });
});

app.post('/usuarios', async (req, res) => {
    const usuario = req.body;
    await insertUsuario(usuario);
    res.json({ message: 'Pessoa inserida com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


