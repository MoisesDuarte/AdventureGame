// (limparCena, mostrarItem, bloquearMenu - ui_functions.js)

// FUNÇÕES PARA CONSTRUÇÃO DE CENA DE JOGO
function montarCena(nomeCena) {
    // Limpa a cena
    limparCena();

    let jsonStorage = localStorage.getItem('cenas');
    let cenaJson = JSON.parse(jsonStorage);
    let idCena;

    // Procurando a cena com base em nome passado
    for (let i = 0; i < cenaJson.length; i++) {
        if (cenaJson[i].nome == nomeCena) {
            console.log("Achei! - " + cenaJson[i].nome);
            idCena = i;
        }
    }

    // Definições de Cena
    let background = "url('img/" + cenaJson[idCena].fundo + "')";
    let locais = cenaJson[idCena].locais;
    let pontosInteresse = cenaJson[idCena].pontosInteresse;
    let atores = cenaJson[idCena].atores;

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
        li.id = "local_" + local.id;
        li.innerHTML = local.nome;
        li.addEventListener("click", function() {montarCena(local.nome)});
        movimentoContainer.appendChild(li);
        i++;
    };

    // Inserindo Atores
    i = 0;
    for (let ator of atores) {
        let li = document.createElement("LI");
        li.id = 'ator_' + ator.id;
        li.innerHTML = ator.nome;
        li.addEventListener("click", function() {mostrarTexto(ator.falas[ator.estado])});
        falarContainer.appendChild(li);
        i++;
    }

    // Inserindo Pontos de Interesse
    i = 0;
    for (let ponto of pontosInteresse) {
        let li = document.createElement("LI");
        li.id = "ponto" + ponto.id;
        li.innerHTML = ponto.nome;
        li.addEventListener("click", function() {mostrarTexto(ponto.descricao)});
        examinarContainer.appendChild(li);
        i++;
    }
    
    
}

function limparCena() {
    let elementosAntigos = document.querySelectorAll("ul:not(.menu-items)");
    let textoAntigo = document.querySelector(".text-conteudo");
    for (let elemento of elementosAntigos) {
        elemento.innerHTML = "";
    }

    textoAntigo.innerHTML = "";
}

function guardarCenas() {
    fetch('./cenas/_cenas.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        let stringJson = JSON.stringify(data);
        let cenaObj = JSON.parse(stringJson);

        localStorage.setItem('cenas', stringJson);
        console.log(cenaObj[0].nome)
    })
}