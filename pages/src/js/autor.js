document.addEventListener("DOMContentLoaded", function() {
    const autores = [
        {
            nome: "Bret Easton Ellis",
            foto: "https://www.bennington.edu/sites/default/files/styles/alumni_profile_640_x_460/public/sources/alumni/EastonEllis_Bret_640x460.jpg.webp?itok=uwhIEBTg",
            descricao: "Bret Easton Ellis é um escritor e roteirista americano conhecido por seus romances controversos, incluindo 'Psicopata Americano' e 'Menos Que Zero'.",
            idade: 57,
            localNascimento: "Los Angeles, Califórnia, EUA"
        },
        {
            nome: "Chuck Palahniuk",
            foto: "https://www.mensjournal.com/.image/t_share/MTk2MTM2MjQ3MjM4MDEwMDAx/main-chuckp.jpg",
            descricao: "Chuck Palahniuk é um romancista e ensaísta americano, conhecido principalmente por seu romance de 1996, 'Clube da Luta', que foi adaptado para um filme de grande sucesso.",
            idade: 59,
            localNascimento: "Pasco, Washington, EUA"
        },
        {
            nome: "Jordan Belfort",
            foto: "https://resizer.iproimg.com/unsafe/640x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2014/01/392457.jpg",
            descricao: "Jordan Belfort é um autor e ex-corretor da bolsa de valores americano, mais conhecido por seu livro 'O Lobo de Wall Street'.",
            idade: 61,
            localNascimento: "Bronx, Nova York, EUA"
        },
        {
            nome: "McG",
            foto: "https://www.emmys.com/sites/default/files/styles/slider_images/public/McG-900x600.jpg?itok=_iqIDX04",
            descricao: "McG é um diretor, produtor e escritor americano, conhecido por seu trabalho em filmes e séries de televisão, incluindo 'A Babá'.",
            idade: 53,
            localNascimento: "Kalamazoo, Michigan, EUA"
        }
    ];

    const autoresElements = document.querySelectorAll(".autor");

    autoresElements.forEach((autorElement, index) => {
        autorElement.style.backgroundImage = `url(${autores[index].foto})`;
        autorElement.addEventListener("mouseover", function() {
            mostrarAutor(autores[index], autorElement);
        });
        autorElement.addEventListener("mouseout", function() {
            esconderAutor();
        });
    });

    function mostrarAutor(autor, autorElement) {
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("autor-info-tooltip");
        infoDiv.innerHTML = `
            <h2>${autor.nome}</h2>
            <p>${autor.descricao}</p>
            <p>Idade: ${autor.idade}</p>
            <p>Local de nascimento: ${autor.localNascimento}</p>
        `;
        autorElement.appendChild(infoDiv);
    }

    function esconderAutor() {
        const infoDiv = document.querySelector(".autor-info-tooltip");
        if (infoDiv) {
            infoDiv.remove();
        }
    }
});
