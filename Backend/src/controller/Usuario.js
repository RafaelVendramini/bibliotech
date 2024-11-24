import openDb from '../configDb.js';

export default async function createTable() {
    const db = await openDb();
    openDb().then(db => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS Usuario (
                id INTEGER PRIMARY KEY ,
                nome TEXT,
                email TEXT,
                senha TEXT
            )
        `);
    })
    
    
}

export async function insertUsuario(pessoa) {
    const db = await openDb();
    const { id, nome, ano } = pessoa;
    await db.run(`
        INSERT INTO Pessoa (id, nome, ano)
        VALUES (?, ?, ?)
    `, [id, nome, ano]);
}

export async function getUsuarios() {
    const db = await openDb();
    return db.all('SELECT * FROM Pessoa');
}