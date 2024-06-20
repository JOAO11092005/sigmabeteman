// Função para mostrar mensagens de sucesso ou erro
function showMessage(message, isSuccess) {
    var messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    if (isSuccess) {
        messageDiv.className = 'message success';
    } else {
        messageDiv.className = 'message error';
    }
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 10000); // 10 segundos
}

// Evento de clique no botão de login
document.getElementById('botao').addEventListener('click', function() {
    var username = document.getElementById('usuario').value;
    var password = document.getElementById('senha').value;
    var email = username + "@example.com"; // Usando o sufixo @example.com para formar um email válido

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            showMessage('Login bem-sucedido!', true);
            setTimeout(() => {
                // Redirecionar para a página protegida após mostrar a mensagem
                window.location.href = './pages/index.html';
            }, 1000); // 1 segundo de espera para exibir a mensagem antes de redirecionar
        })
        .catch((error) => {
            // Erro no login
            showMessage('Erro: ' + error.message, false);
        });
});
