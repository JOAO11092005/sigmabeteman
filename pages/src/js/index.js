


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.livro').forEach(function(livro) {
        livro.addEventListener('click', function() {
            const ebookId = livro.getAttribute('data-id');
            window.location.href = `../pages/src/pg-livro/index.html?ebook=${ebookId}`;
        });
    });
});
// Função para formatar números menores que 10 com zero à esquerda (para exibir 01, 02, ... 09)
function padNumber(num) {
    return num < 10 ? '0' + num : num;
}

// Função para atualizar a data e hora na página
function updateDateTime() {
    const now = new Date();

    // Atualizar ano
    const yearElement = document.getElementById('year');
    yearElement.textContent = now.getFullYear();

    // Atualizar data (dia, mês, ano)
    const dateElement = document.getElementById('date');
    const formattedDate = `${padNumber(now.getDate())}/${padNumber(now.getMonth() + 1)}/${now.getFullYear()}`;
    dateElement.textContent = formattedDate;

    // Atualizar hora (hora, minuto, segundo)
    const timeElement = document.getElementById('time');
    const formattedTime = `${padNumber(now.getHours())}:${padNumber(now.getMinutes())}:${padNumber(now.getSeconds())}`;
    timeElement.textContent = formattedTime;
}

// Atualizar a data e hora inicialmente
updateDateTime();

// Atualizar a cada segundo (1000 milissegundos)
setInterval(updateDateTime, 1000);
