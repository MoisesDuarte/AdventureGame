// (limparCena, mostrarItem, bloquearMenu - ui_functions.js)

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
            let background = "url('img/" + cenaJson.fundo + "')";
            let locais = cenaJson.locais;
            let pontosInteresse = cenaJson.pontosInteresse;
            let atores = cenaJson.atores;

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
                li.addEventListener("click", function() {montarCena(local.destino)});
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

            console.log(document.querySelectorAll("li"));

        })
        .catch(err => {
            console.log("Request Inválido. Checar url do arquivo.")
        })    
}

function limparCena() {
    let elementosAntigos = document.querySelectorAll("ul:not(.menu-items):not(.inventario-items)");
    let textoAntigo = document.querySelector(".text-conteudo");
    for (let elemento of elementosAntigos) {
        elemento.innerHTML = "";
    }

    textoAntigo.innerHTML = "";
}