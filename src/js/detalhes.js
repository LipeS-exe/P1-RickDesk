const especies = document.querySelectorAll(".especies-personagens");
const generos = document.querySelectorAll(".generos-personagens");
const sts = document.querySelectorAll(".status-personagens")
const Name = document.querySelectorAll("nome-personagens");
const img = document.querySelectorAll(".imagem.personagem");
const localizacao = document.querySelectorAll(".ultima-localizacao");
const vistoPrimeira = document.querySelectorAll(".visto-primeira");
const btnVoltar = document.querySelectorAll(".botao-voltar");


const BASE_URL = "https://rickandmortyapi.com/api";


const api = axios.create({
    baseURL: BASE_URL
});

const defailtFilters = {
    name: '',
    status:'',
    gender: '',
    species:'',
    page: 1
};

async function getPersonagens({ name, species, gender, status , page = 1}) {
    const resposta = await api.get("/character", {
        params: {
            name:name ,
            status: status,
            gender: gender,
            species: species,
            page: page
        }
    });
    return resposta.data.results;
    
}

async function carregar(filtros = defaultFilters) {
    try {
        const personagems = await getPersonagens(filtros);
        
        for (let indice = 0; indice < personagems.length; indice++) {
            const personagem = personagems[indice];

            if (imgs[indice] && nomes[indice]) {
                imgs[indice].src = personagem.image;

                // pega a URL do primeiro episódio
                const primeiroEpUrl = personagem.episode[0];

                // faz a requisição do episódio
                const resEp = await axios.get(primeiroEpUrl);
                const nomeEp = resEp.data.name;

                nomes[indice].textContent = `
${personagem.name}
${personagem.status} - ${personagem.species}
Primeiro EP: ${nomeEp}
`;
            }
        }

        console.log(`${personagems.length} personagens carregados com sucesso!`);
        
    } catch(erro) {
        console.error("Erro -> 7001", erro);
    }
}
carregar();