

const imgs = document.querySelectorAll(".img-personagems");
const nomes = document.querySelectorAll(".nome-personagems");

const btn = document.getElementsByClassName("btnLista")
const btns = document.getElementsByClassName("btnLista");

Array.from(btns).forEach(btn => {
    btn.addEventListener("click", () => {
        setTimeout(() => {
            window.location.href = "detalhes.html";
        }, 300);
    });
});
    const BASE_URL = "https://rickandmortyapi.com/api";

const api = axios.create({
    baseURL: BASE_URL
});

const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
};

async function getPersonagens({ name, species, gender, status, page = 1 }) {
    const resposta = await api.get("/character", {
        params: {
            name: name,
            species: species,
            gender: gender,
            status: status,
            page: page
        }
    });
    return resposta.data.results;
}

async function carregar(filtros = defaultFilters) {
    try {
        const personagems = await getPersonagens(filtros);
        
        personagems.forEach((personagem, indice) => {
            if (imgs[indice] && nomes[indice]) {
                imgs[indice].src = personagem.image;
                nomes[indice].textContent = personagem.name;
            }
        });
        
        console.log(`${personagems.length} personagens carregados com sucesso!`);
        
    } catch(erro) {
        console.error("Erro -> 7001", erro);
    }
}

carregar();