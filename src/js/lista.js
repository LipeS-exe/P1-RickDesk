const BASE_URL = "https://rickandmortyapi.com/api";
const api = axios.create({ baseURL: BASE_URL });

async function carregar() {
    try {
        const resposta = await api.get("/character", { params: { page: 1 } });
        const personagems = resposta.data.results;

        const imgs = document.querySelectorAll(".img-personagems");
        const nomes = document.querySelectorAll(".nome-personagems");
        const btns = document.querySelectorAll(".btnLista");

        personagems.forEach((personagem, indice) => {
            if (imgs[indice]) imgs[indice].src = personagem.image;
            if (nomes[indice]) nomes[indice].textContent = personagem.name;

            if (btns[indice]) {
                btns[indice].onclick = () => {
                    window.location.href = `detalhes.html?id=${personagem.id}`;
                };
            }
        });

    } catch (erro) {
        console.error("Erro -> 7001", erro);
    }
}

carregar();