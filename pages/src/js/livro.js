document.addEventListener("DOMContentLoaded", function() {
    const filmes = [
        {
            titulo: "American Psycho",
            descricao: "Um romance controverso que explora a psicopatia e a desumanização na sociedade moderna.",
            plataforma: "https://www.primevideo.com/dp/amzn1.dv.gti.00b919c3-abaa-3082-bf99-ceff6ebe6f7a?autoplay=0&ref_=atv_cf_strg_wb",
            plataformaImagem: "https://static.poder360.com.br/2023/09/amazon-prime-video-848x477.jpeg",
            poster: "https://images.justwatch.com/poster/284909017/s718/psicopata-americano.jpg",
            background: "https://macabra.tv/wp-content/uploads/2020/07/macabra-Pol%C3%AAmicas-sobre-Psicopata-Americano.png"
        },
        {
            titulo: "Clube da Luta",
            descricao: "Clube da Luta é um romance escrito por Chuck Palahniuk. O livro narra a história de um narrador anônimo que se envolve em um clube de luta clandestino como uma forma de lidar com sua insônia e insatisfação com a vida.",
            plataforma: "https://www.starplus.com/pt-br/video/cc63442f-3f75-4ebe-9639-2a2aabf7095e?distributionPartner=google",
            plataformaImagem: "https://t.ctcdn.com.br/jDjUmBRjNJX0sRKnw2hfK_Jnst4=/2920x1643/smart/i478633.jpeg",
            poster: "https://br.web.img3.acsta.net/medias/nmedia/18/90/95/96/20122166.jpg",
            background: "https://institutoling.org.br/uploads/kraken/1669811765-Clube%20da%20Luta_Adapta%C3%A7%C3%A3o%20entre%20a%20literatura%20e%20o%20cinema.webp"
        },
        {
            titulo: "O Lobo de Wall Street",
            descricao: "O livro Lobo de Wall Street é uma obra biográfica de memórias escrita por Jordan Belfort, que foi publicada em 2007.",
            plataforma: "https://play.max.com/movie/f8ed71eb-f20a-45ca-8881-c809f885974f?utm_source=universal_search",
            plataformaImagem: "https://kanto.legiaodosherois.com.br/w728-h381-gnw-cfill-gcc/wp-content/uploads/2023/05/legiao_twfi2VqEbNTK.jpg.webp",
            poster: "https://br.web.img2.acsta.net/pictures/13/12/30/18/11/111145.jpg",
            background: "https://miro.medium.com/v2/resize:fit:1400/1*2QWaQJ9TxOZvsNWA4OM1uw.jpeg"
        }
    ];

    let filmeAtual = 0;

    function mostrarFilme() {
        const filme = filmes[filmeAtual];
        document.querySelector(".poster-do-filme .poster").style.backgroundImage = `url(${filme.poster})`;
        document.querySelector(".filmes").style.backgroundImage = `url(${filme.background})`;
        document.getElementById("titulo-filme").textContent = filme.titulo;
        document.getElementById("descricao-filme").textContent = filme.descricao;

        const plataformaLink = document.getElementById("plataformas-filme");
        plataformaLink.href = filme.plataforma;
        plataformaLink.style.backgroundImage = `url(${filme.plataformaImagem})`;
        plataformaLink.textContent = ""; // Clear any text
    }

    function atualizarIndicador() {
        const indicador = document.querySelector(".indicador");
        indicador.innerHTML = "";
        filmes.forEach((_, index) => {
            const span = document.createElement("span");
            if (index === filmeAtual) {
                span.classList.add("ativo");
            }
            indicador.appendChild(span);
        });
    }

    function proximoFilme() {
        filmeAtual = (filmeAtual + 1) % filmes.length;
        mostrarFilme();
        atualizarIndicador();
    }

    document.getElementById("mudar-filme").addEventListener("click", proximoFilme);

    // Inicialização
    mostrarFilme();
    atualizarIndicador();
});
