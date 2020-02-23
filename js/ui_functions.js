// FUNÇÕES PARA CONSTRUÇÃO DE CENA DE JOGO
function montarCena(nomeCena) {
    // Limpa a cena
    limparCena();

    // Request do arquivo JSON
    fetch('../cenas/' + nomeCena + '.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            let jsonstring = JSON.stringify(data);
            let cenaJson = JSON.parse(jsonstring);

            // Definições de Cena
            let background = "url('img/" + cenaJson[0].fundo + "')";
            let locais = cenaJson[0].locais;
            let pontosInteresse = cenaJson[0].pontosInteresse;
            let atores = cenaJson[0].atores;

            // Elementos da Interface
            let telaContainer = document.querySelector(".tela-container");
            let movimentoContainer = document.querySelector(".movimento-items");
            let examinarContainer = document.querySelector(".examinar-items");
            let falarContainer = document.querySelector(".falar-items");
            let inventarioContainer = document.querySelector(".inventario-items");

            // Mostrando plano de fundo da cena
            telaContainer.style.backgroundImage = background;

            // Inserindo botão VOLTAR fixo no topo de cada menu
            let elementosLimpos = document.querySelectorAll("ul:not(.menu-items)");        
            
            for (let elemento of elementosLimpos) {
                let voltar = document.createElement("LI");
                let hr = document.createElement("HR");
                voltar.innerHTML = "VOLTAR";
                voltar.addEventListener("click", () => {mostrarItem(".menu-items")});
                elemento.appendChild(voltar);
                elemento.appendChild(hr);
            }; 

            // Inserindo locais
            let i = 0;
            for (let local of locais) {
                let li = document.createElement("LI");
                li.id = "local" + i;
                li.innerHTML = local.nome;
                li.addEventListener("click", function() {montarCena(local.destino)});
                movimentoContainer.appendChild(li);
                i++;
            };

            // Inserindo Atores
            i = 0;
            for (let ator of atores) {
                let li = document.createElement("LI");
                li.id = 'ator' + i;
                li.innerHTML = ator.nome;
                li.addEventListener("click", function() {mostrarTexto(ator.falas["neutro"])});
                falarContainer.appendChild(li);
                i++;
            }

            // Inserindo Pontos de Interesse
            i = 0;
            for (let ponto of pontosInteresse) {
                let li = document.createElement("LI");
                li.id = "ponto" + i;
                li.innerHTML = ponto.nome;
                li.addEventListener("click", function() {mostrarTexto(ponto.descricao)});
                examinarContainer.appendChild(li);
                i++;
            }    
        })
        .catch(err => {
            console.log("Request Inválido. Checar url do arquivo.")
        })    
}

function atualizarCena(arrayLocais, arrayAtores, arrayPontos) {

}

function limparCena() {
    let elementosAntigos = document.querySelectorAll("ul:not(.menu-items):not(.inventario-items)");
    let textoAntigo = document.querySelector(".text-conteudo");
    for (let elemento of elementosAntigos) {
        elemento.innerHTML = "";
    }

    textoAntigo.innerHTML = "";
}

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