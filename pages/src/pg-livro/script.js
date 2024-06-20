const urlParams = new URLSearchParams(window.location.search);
const ebookId = urlParams.get('ebook');

fetch('../json/ebooks.json')
    .then(response => response.json())
    .then(data => {
        const ebook = data.ebooks.find(ebook => ebook.id === ebookId);
        if (ebook) {
            document.title = ebook.title;
            document.body.style.backgroundImage = `url(${ebook.background})`;
            renderPDF(ebook.path);
        } else {
            console.error('Ebook não encontrado.');
        }
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

let pdfDoc = null;
let pageNum = 1;
const scale = 1.5;
const canvasContainer = document.getElementById('pdf-render');
const ctx = canvasContainer.getContext('2d');
const pageNumElement = document.getElementById('page-num');
const pageCountElement = document.getElementById('page-count');

// Função para carregar e renderizar o PDF
function renderPDF(url) {
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        pdfDoc = pdf;
        pageCountElement.textContent = pdf.numPages;
        const savedPage = localStorage.getItem(`page-${ebookId}`);
        pageNum = savedPage ? parseInt(savedPage) : 1;
        renderPage(pageNum);
    }).catch(function(error) {
        console.error('Erro ao carregar o PDF:', error);
    });
}

// Função para renderizar uma página específica
function renderPage(num) {
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale });
        canvasContainer.height = viewport.height;
        canvasContainer.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        page.render(renderContext).promise.then(function() {
            pageNumElement.textContent = num;
        });
    }).catch(function(error) {
        console.error('Erro ao renderizar a página:', error);
    });
}

// Função para salvar a página atual no localStorage
function savePage() {
    localStorage.setItem(`page-${ebookId}`, pageNum);
}

// Botão para próxima página
document.getElementById('next-page-notebook').addEventListener('click', function() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    renderPage(pageNum);
    savePage();
});

// Botão para página anterior
document.getElementById('prev-page-notebook').addEventListener('click', function() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    renderPage(pageNum);
    savePage();
});

// Botão para próxima página (mobile)
document.getElementById('next-page-mobile').addEventListener('click', function() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    renderPage(pageNum);
    savePage();
});

// Botão para página anterior (mobile)
document.getElementById('prev-page-mobile').addEventListener('click', function() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    renderPage(pageNum);
    savePage();
});

// Botão para salvar a posição de leitura em um arquivo
document.getElementById('save-page').addEventListener('click', function() {
    const pageInfo = `Você parou na página ${pageNum} de ${pdfDoc.numPages} do ebook ${document.title}`;
    const blob = new Blob([pageInfo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `posicao_leitura_${ebookId}.txt`;
    link.click();
});

// Iniciar o leitor de PDF
document.addEventListener('DOMContentLoaded', function() {
    // Certifique-se de definir pdfUrl corretamente
    const initialEbookPath = data.ebooks.find(ebook => ebook.id === ebookId).path;
    renderPDF(initialEbookPath);
});
