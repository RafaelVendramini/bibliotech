const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.sqlite");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            autor TEXT,
            ano INTEGER,
            genero TEXT,
            edicao TEXT
        )
    `);
});

db.close();