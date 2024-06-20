// Função para verificar as credenciais na URL e redirecionar conforme necessário
function checkCredentialsAndRedirect() {
    const currentUrl = window.location.href;

    // Verifica se a página atual não é a página de login (index.html) e se não há credenciais válidas na URL
    if (!currentUrl.includes('index.html') && !hasValidCredentials(currentUrl)) {
        // Redireciona para a página de carregamento (load.html) se as credenciais não estiverem presentes ou forem inválidas
        window.location.href = 'load.html'; // Substitua 'load.html' pela página desejada
    }
}

// Função para verificar se há usuário e senha na URL
function hasValidCredentials(url) {
    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {
        const hash = url.substring(hashIndex + 1);
        const parts = hash.split('@');
        if (parts.length === 2) {
            const [username, password] = parts;
            // Aqui você pode adicionar lógica adicional, como verificar com uma lista de usuários válidos
            return true; // Retorne true se as credenciais forem válidas, ou false caso contrário
        }
    }
    return false; // Retorna false se não houver credenciais na URL
}

// Verifica as credenciais a cada 2 segundos
setInterval(checkCredentialsAndRedirect, 2000); // Verifica a cada 2 segundos
