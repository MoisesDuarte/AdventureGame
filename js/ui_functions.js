// FUNÇÃO PARA CONSTRUÇÃO DE CENA DE JOGO
function montarCena(nomeCena) {
    let i = 0;

    // Request do arquivo JSON
    fetch('../cenas/' + nomeCena + '.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            let jsonstring = JSON.stringify(data);
            let cenaJson = JSON.parse(jsonstring);

            // Itens de Cena
            let background = "url('img/" + cenaJson[0].fundo + "')";
            let locais = cenaJson[0].locais;
            let pontosInteresse = cenaJson[0].pontosInteresse;
            
            // Elementos da cena
            let telaContainer = document.querySelector(".tela-container");
            let movimentoContainer = document.querySelector(".movimento-items");
            let examinarContainer = document.querySelector(".examinar-items");
            let inventarioContainer = document.querySelector(".inventario-items");

            telaContainer.style.backgroundImage = background;

            // Criando e concatenando elementos li a lista
            for (let local of locais) {
                let li = document.createElement("LI");
                li.id = "local" + i;
                li.innerHTML = local;
                li.addEventListener("click", function() {console.log("Mover para " + local)});
                movimentoContainer.appendChild(li);
                i++;
            };

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

// FUNÇÕES PARA CONTROLE DA INTERFACE
function mostrarItem(newClass) {
    let el = document.body.querySelectorAll("ul");
    let newEl = document.body.querySelector(newClass);

    el.forEach(element => {
        element.style.display = "none";
    });

    newEl.style.display = "block";
}

function mostrarTexto(txt) {
    let el = document.querySelector(".text-conteudo");
    el.innerHTML = "";
    el.innerHTML = txt;
}