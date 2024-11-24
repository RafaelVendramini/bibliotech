const livrosContainer = document.querySelector('#livros');

async function fetchLivros() {
    const response = await fetch('http://localhost:3000/livros');
    const data = await response.json();
    data.data.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.innerHTML = `
            <h2>${livro.titulo}</h2>
            <p>Autor: ${livro.autor}</p>
            <p>Ano: ${livro.ano}</p>
            <p>Gênero: ${livro.genero}</p>
            <p>Editora: ${livro.editora}</p>

            
            <button class="btn btn-primary" onclick="abrirModalUpdate('${livro.id}','${livro.titulo}', '${livro.autor}', '${livro.ano}', '${livro.genero}', '${livro.editora}')">Editar</button>
            <button class="btn btn-danger" onclick="deleteLivro(${livro.id})">Excluir</button>
            <hr>
        `;
        livrosContainer.appendChild(livroElement);
    });
    return data;
}

fetchLivros();  

function deleteLivro(id) {
    fetch(`http://localhost:3000/livros/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao excluir o livro.');
    });
}

function abrirModalUpdate(id, titulo, autor, ano, genero, editora) {
    const modal = new bootstrap.Modal(document.getElementById('modalUpdate'));
    modal.show();
    document.querySelector('#bookId').value = id;
    document.querySelector('#bookTitle').value = titulo;
    document.querySelector('#bookAutor').value = autor;
    document.querySelector('#bookAno').value = ano;
    document.querySelector('#bookGenero').value = genero;
    document.querySelector('#bookEditora').value = editora;
}




// ATUALIZAR DADOS DO LIVRO
function atualizarDados() {
    const id = document.querySelector('#bookId').value;
    const titulo = document.querySelector('#bookTitle').value;
    const autor = document.querySelector('#bookAutor').value;
    const ano = document.querySelector('#bookAno').value;
    const genero = document.querySelector('#bookGenero').value;
    const editora = document.querySelector('#bookEditora').value;

    console.log(id, titulo, autor, ano, genero, editora);

    fetch(`http://localhost:3000/livros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, ano, genero, editora })
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);

        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao atualizar o livro.');
    });
}


