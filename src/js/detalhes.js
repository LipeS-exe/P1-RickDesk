const BASE_URL = "https://rickandmortyapi.com/api";
const api = axios.create({ baseURL: BASE_URL });

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarDetalhes() {
    try {
        if (!id) {
            console.error("ID não encontrado na URL");
            return;
        }

        const resposta = await api.get(`/character/${id}`);
        const personagem = resposta.data;

        document.querySelector(".imagem-personagens").src = personagem.image;
        document.querySelector(".nome-personagens").textContent = personagem.name;
        document.querySelector(".status-personagens").textContent = personagem.status;
        document.querySelector(".especies-personagens").textContent = `- ${personagem.species}`;

        // Cor da bolinha de status
        const ball = document.querySelector(".ball-life");
        ball.classList.remove("bg-green-700", "bg-green-500", "bg-red-600", "bg-gray-400");
        if (personagem.status === "Alive") ball.classList.add("bg-green-500");
        else if (personagem.status === "Dead") ball.classList.add("bg-red-600");
        else ball.classList.add("bg-gray-400");

        document.querySelector(".ultima-localizacao").textContent = personagem.location.name;

        // Primeiro episódio
        const resEp = await axios.get(personagem.episode[0]);
        document.querySelector(".visto-primeira").textContent = resEp.data.name;

        // Botão voltar → volta para a lista
        document.querySelector(".botao-voltar").addEventListener("click", () => {
            window.location.href = "lista.html";
        });

    } catch (erro) {
        console.error("Erro ao carregar personagem:", erro);
    }
}

carregarDetalhes();