import openDb from '../configDb.js';

// Função para criar a tabela Livro
export default async function createTable() {
    const db = await openDb();
    openDb().then(db => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS Livro (
                id INTEGER PRIMARY KEY ,
                titulo TEXT NOT NULL,
                autor TEXT NOT NULL,
                ano TEXT NOT NULL,
                genero TEXT NOT NULL,                  
                editora TEXT NOT NULL
                
            )
        `);
    })
    
    
}


// Função para inserir um novo livro
export async function insertLivro(livro) {
    const { titulo, autor, ano, genero, editora } = livro;

    if (!titulo || !autor || !ano || !genero || !editora) {
        throw new Error('Todos os campos são obrigatórios');
    }

    const db = await openDb();
    await db.run(`
        INSERT INTO Livro (titulo, autor, ano, genero, editora)
        VALUES (?, ?, ?, ?, ?)
    `, [titulo, autor, ano, genero, editora]);
}

// Função para listar todos os livros
export async function getLivros() {
    const db = await openDb();
    return db.all('SELECT * FROM Livro');
}

// Função para atualizar um livro
export async function updateLivro(id ,livro) {
    const {titulo, autor, ano, genero, editora } = livro;
    console.log("id", id);
    console.log("titulo", titulo);
    console.log("autor", autor);
    console.log("ano", ano);
    console.log("genero", genero);
    console.log("editora", editora);


    if (!id || !titulo || !autor || !ano || !genero || !editora) {
        throw new Error('Todos os campos são obrigatórios');
    }
    const db = await openDb();
    await db.run(`
        UPDATE Livro SET titulo = ?, autor = ?, ano = ?, genero = ?, editora = ? WHERE id = ?
    `, [titulo, autor, ano, genero, editora, id]);
}

//função para deletar um livro
export async function deleteLivro(id) {
    const db = await openDb();
    await db.run('DELETE FROM Livro WHERE id = ?', id);
}