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

            // Colocando botão de retorno no topo de cada lista
            let voltar1 = document.createElement("LI");
            let hr1 = document.createElement("HR");
            voltar1.innerHTML = "VOLTAR";
            voltar1.addEventListener("click", () => {mostrarItem(".menu-items")});

            // TODO: Código redundante. Procurar uma maneira de 'replicar' click listener dinamicamente para varios elementos (um for deve bastar)
            let voltar2 = document.createElement("LI");
            let hr2 = document.createElement("HR");
            voltar2.innerHTML = "VOLTAR";
            voltar2.addEventListener("click", () => {mostrarItem(".menu-items")});

            movimentoContainer.appendChild(voltar1);
            movimentoContainer.appendChild(hr1);

            examinarContainer.appendChild(voltar2);
            examinarContainer.appendChild(hr2);

            // Criando e concatenando elementos li a lista
            let i = 0;
            for (let local of locais) {
                let li = document.createElement("LI");
                li.id = "local" + i;
                li.innerHTML = local.nome;
                li.addEventListener("click", function() {montarCena(local.destino)});
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

function limparCena() {
    // TODO: muita repetição aqui. procurar unificar seletores e acesso a innerhtml
    let movimentoAntigo = document.querySelector(".movimento-items");
    let examinarAntigo = document.querySelector(".examinar-items");
    let textAntigo = document.querySelector(".text-conteudo");
    movimentoAntigo.innerHTML = "";
    examinarAntigo.innerHTML = "";
    textAntigo.innerHTML = "";
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