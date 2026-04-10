const btnHome = document.getElementById("btnHome");
const palavraRick = document.getElementById("word-secret");

btnHome.addEventListener("click", () =>{
    palavraRick.classList.remove("hidden");



    setTimeout(() =>{
        window.location.href = "lista.html";}, 3000);
    });


