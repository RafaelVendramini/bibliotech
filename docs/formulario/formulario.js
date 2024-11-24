document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log("Dados",data);

    fetch('http://localhost:3000/livros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        window.location.reload();
        alert('Livro cadastrado com sucesso!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao cadastrar o livro.');
    });
});