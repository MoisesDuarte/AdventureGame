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
            let atores = cenaJson[0].atores;

            // Elementos da cena
            let telaContainer = document.querySelector(".tela-container");
            let movimentoContainer = document.querySelector(".movimento-items");
            let examinarContainer = document.querySelector(".examinar-items");
            let falarContainer = document.querySelector(".falar-items");
            let inventarioContainer = document.querySelector(".inventario-items");

            telaContainer.style.backgroundImage = background;

            // Colocando botão de retorno no topo de cada lista
            let elementosLimpos = document.querySelectorAll("ul:not(.menu-items):not(.inventario-items)");        
            
            for (let elemento of elementosLimpos) {
                let voltar = document.createElement("LI");
                let hr = document.createElement("HR");
                voltar.innerHTML = "VOLTAR";
                voltar.addEventListener("click", () => {mostrarItem(".menu-items")});
                elemento.appendChild(voltar);
                elemento.appendChild(hr);
            }; 

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
            for (let ator of atores) {
                let li = document.createElement("LI");
                li.id = 'ator' + i;
                li.innerHTML = ator.nome;
                console.log(ator.falas["neutro"]);
                li.addEventListener("click", function() {mostrarFala(ator.falas["neutro"])});
                falarContainer.appendChild(li);
                i++;
            }

            i = 0;
            for (let ponto of pontosInteresse) {
                let li = document.createElement("LI");
                li.id = "ponto" + i;
                li.innerHTML = ponto.nome;
                li.addEventListener("click", function() {mostrarDescricao(ponto.descricao)});
                examinarContainer.appendChild(li);
                i++;
            }    
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

// FUNÇÕES PARA CONTROLE DA INTERFACE
function mostrarItem(newClass) {
    let el = document.body.querySelectorAll("ul");
    let newEl = document.body.querySelector(newClass);

    el.forEach(element => {
        element.style.display = "none";
    });

    newEl.style.display = "block";
}

function mostrarDescricao(txt) {
    let el = document.querySelector(".text-conteudo");
    el.innerHTML = "";
    el.innerHTML = txt;
}

function mostrarFala(arrayFalas) {
    // TODO: 'Pausar' enquanto a fala estiver correndo pela tela
    let i = 0;
    let el = document.querySelector(".text-conteudo");
    let falas = arrayFalas;

    for (let fala of falas) {
        ((i) => {
            setTimeout(() => {
                el.innerHTML = fala;
            }, 4000*i); // delay para aparição de fala
        })(i);
        i++;
    }
}