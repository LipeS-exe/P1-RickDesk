const { default: axios } = require("axios");

const imgs = document.querySelectorAll(".img-personagems");
const nomes = document.querySelectorAll(".nome-personagems");

const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api"
});

axios.get("https://rickandmortyapi.com/api/character").then(res => {
    const personagems = res.data.results.slice(0,15);

    personagems.forEach(p , index => {
        imgs[index].src =p.image;
        nomes[index].textContent= p.name;
        });
})