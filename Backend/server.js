const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

// Configura o banco de dados SQLite
const db = new sqlite3.Database("./db/database.sqlite", (err) => {
    if (err) console.error("Erro ao conectar ao banco de dados:", err);
    else console.log("Banco de dados conectado.");
});

app.use(express.json());

// Rota para listar todos os livros
app.get("/livros", (req, res) => {
    db.all("SELECT * FROM livros", (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ data: rows });
    });
});

// Rota para adicionar um novo livro
app.post("/livros", (req, res) => {
    const { nome, autor, ano, genero, edicao } = req.body;
    db.run(
        "INSERT INTO livros (nome, autor, ano, genero, edicao) VALUES (?, ?, ?, ?, ?)",
        [nome, autor, ano, genero, edicao],
        function (err) {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ message: "Livro adicionado com sucesso!", id: this.lastID });
        }
    );
});

// Rota para atualizar um livro
app.put("/livros/:id", (req, res) => {
    const { nome, autor, ano, genero, edicao } = req.body;
    const { id } = req.params;
    db.run(
        "UPDATE livros SET nome = ?, autor = ?, ano = ?, genero = ?, edicao = ? WHERE id = ?",
        [nome, autor, ano, genero, edicao, id],
        (err) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ message: "Livro atualizado com sucesso!" });
        }
    );
});

// Rota para deletar um livro
app.delete("/livros/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM livros WHERE id = ?", id, (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Livro deletado com sucesso!" });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
