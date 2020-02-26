// FUNÇÕES PARA CONTROLE DA INTERFACE
function mostrarItem(item) {
    let el = document.body.querySelectorAll("ul");
    let newEl = document.body.querySelector(item);

    el.forEach(element => {
        element.style.display = "none";
    });

    newEl.style.display = "block";
}

function mostrarTexto(arrayFalas) {
    let i = 0;
    let textContainer = document.querySelector(".text-container");
    let textConteudo = document.querySelector(".text-conteudo");
    let textNext = document.querySelector(".text-next");
    let falas = arrayFalas;

    // Primeira Fala
    textConteudo.innerHTML = falas[0];
    textNext.style.display = "block";
    i++;

    bloquearMenu();

    // Falas Subsequentes
    textContainer.addEventListener("click", function avancarTexto(){
        if (i == falas.length) {
            textConteudo.innerHTML = "";
            textNext.style.display = "none";
            textContainer.removeEventListener("click", avancarTexto);
            permitirMenu();
        }

        while (i < falas.length) {
            console.log(i + " : " + falas[i]);
            textConteudo.innerHTML = falas[i];
            i++;
            break;
        }
    });
}

function bloquearMenu() {
    let elMenus = document.querySelectorAll("li");
    for (let menu of elMenus) {
        menu.style.color = 'gray';
        menu.style.pointerEvents = "none";
    }
}

function permitirMenu() {
    let elMenus = document.querySelectorAll("li");
    for (let menu of elMenus) {
        menu.style.color = 'var(--main-primary-color)';
        menu.style.pointerEvents = "auto";
    }
}