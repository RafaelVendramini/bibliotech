const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("Backend/database.sqlite");

db.serialize(() => {
    // Cria a tabela livros se não existir
    db.run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            autor TEXT NOT NULL,
            ano INTEGER NOT NULL,
            genero TEXT NOT NULL,
            edicao TEXT NOT NULL
        )
    `);

    // Insere um livro de exemplo
    db.run(`
        INSERT INTO livros (nome, autor, ano, genero, edicao)
        VALUES ('Livro Exemplo', 'Autor Exemplo', 2021, 'Ficção', '1ª Edição')
    `);
});

db.close();