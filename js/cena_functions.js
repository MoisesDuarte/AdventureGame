function montarCena(idCena) {
    limparCena();

    let cenaJson = JSON.parse(localStorage.getItem('cenas'));
    let invJson = JSON.parse(localStorage.getItem('inventario'));

    // Guardando objetos da cena em arrays
    let background = 'url("img/' + cenaJson[idCena].fundo + '")';
    let arrayLocais = cenaJson[idCena].locais;
    let arrayPontos = cenaJson[idCena].pontosInteresse;
    let arrayAtores = cenaJson[idCena].atores;
    let arrayInventario = invJson;

    // Selecionando container dos elementos da tela
    let cTela = document.querySelector('.tela-container');
    let cMovimento = document.querySelector('.movimento-items');
    let cExaminar = document.querySelector('.examinar-items');
    let cInteracoes = document.querySelector('.inventario-interacoes');
    let cInventario = document.querySelector('.inventario-items');

    // Definindo imagem de fundo da cena
    cTela.style.backgroundImage = background;

    // Adicionando a opção voltar e um divisor no topo de cada lista
    let elementosLimpos = document.querySelectorAll('ul:not(.menu-items)');   
    for (let elemento of elementosLimpos) {
        html = `<li class="voltar_${elemento.className}" onclick="mostrarMenu('.menu-items')">
                    VOLTAR
                </li>`;

        elemento.insertAdjacentHTML('beforeend', html);
    }

    // Adicionando opções a cada menu
    for (let local of arrayLocais) {
        html = `<li id="local_${local.id}" onclick="montarCena(${local.idCena})">
                    ${local.nome}
                </li>`;

        cMovimento.insertAdjacentHTML('beforeend', html);
    }

    // Adicionando opções ao menu de interações
    let intTitle = document.createElement('p');
    intTitle.innerHTML = 'USAR EM:';
    cInteracoes.appendChild(intTitle);

    let arrayInteracoes = [arrayPontos, arrayAtores];
    arrayInteracoes.forEach((array) => {
        for (let interact of array) {
            let liExaminar = document.createElement('li');
            liExaminar.id = 'examinar_' + interact.nome;
            liExaminar.innerHTML = interact.nome;
            liExaminar.addEventListener('click', () => { mostrarTexto(interact.descricoes[interact.estado].descricao) });
            cExaminar.appendChild(liExaminar);

            let li = document.createElement('li');
            li.id = 'interacao_' + interact.nome;
            li.innerHTML = interact.nome;
            li.addEventListener('click', () => { checarInteracao(idCena, interact.nome, interact.descricoes, interact.tipo) });
            cInteracoes.appendChild(li);
        }
    });  
    

    for (let item of arrayInventario) {
        let li = document.createElement('li');
        li.id = 'item_' + item.id;
        li.innerHTML = item.nome;
        li.addEventListener('click', () => { mostrarItem(item) });
        cInventario.appendChild(li);
    };
};


function limparCena() {
    // Selecionando por elementos com conteudo 'antigo'
    let elementosAntigos = document.querySelectorAll('ul:not(.menu-items)');
    let textoAntigo = document.querySelector('.text-conteudo');

    // Limpando cada elemento
    for (let elemento of elementosAntigos) {
        elemento.innerHTML = "";
    }

    // Limpando caixa de texto (Quem sabe poderia ser em outro lugar, como mostrarItem)
    textoAntigo.innerHTML = "";
};


function guardarEstadoInicial() {
    // Fetch de arquvos locais json para salvar em localStorage
    fetch('../cenas/cenas.json')
        .then(res => { return res.json() })
        .then(data => {
            let cenasJson = JSON.stringify(data);
            localStorage.setItem('cenas', cenasJson);      
        });

    fetch('../cenas/inventario.json')
        .then(res => { return res.json() })
        .then(data => {
            let inventarioJson = JSON.stringify(data);
            localStorage.setItem('inventario', inventarioJson)
            location.reload();
        })
};


function checarInteracao(idCena, nome, objTriggers, tipo) {
    let cText = document.querySelector('.text-conteudo');
    let cInteracoes = document.querySelector('.inventario-interacoes');
    let itemAtivo = cInteracoes.dataset.itemAtivo;

    // Procurando por atributo itemTrigger com nome igual ao itemAtivo
    for (let trigger of objTriggers) {
        if (trigger.itemTrigger == itemAtivo) {
            console.log("Interação Válida");
            // Checando se a interação é com ator ou ponto
            if (tipo == 'ator') {
                trocarEstadoAtor(idCena, nome, trigger.idEstado);
            } else if (tipo == 'ponto') {
                trocarEstadoPonto(idCena, nome, trigger.idEstado);
            }
        } else {
            // Mensagem caso não for possível utilizar o item com objeto
            cText.innerHTML = 'Você utiliza <i>' + itemAtivo + '</i> em <i>' + nome + '</i> mas nada acontece.';
        }
    }
};


function trocarEstadoAtor(idCena, nomeAtor, estadoNovo) {
    let jsonStorage = localStorage.getItem('cenas');
    let cenaJson = JSON.parse(jsonStorage);

    // Procura por ator com base em nome e troca seu estado pelo novo
    for (let ator of cenaJson[idCena].atores) {
        if (ator.nome == nomeAtor) {
            ator.estado = estadoNovo;    
        }
    }   
    
    // Salvando cenas atualizadas em localStorage e atualizando ui
    localStorage.setItem('cenas', JSON.stringify(cenaJson));
    montarCena(idCena)
    mostrarMenu('.examinar-items');

    // TODO: Apagar item do inventário após uso
}

function trocarEstadoPonto(idCena, nomePonto, estadoNovo) {
    let jsonStorage = localStorage.getItem('cenas');
    let cenaJson = JSON.parse(jsonStorage);

    for (let ponto of cenaJson[idCena].pontosInteresse) {
        if (ponto.nome == nomePonto) {
            ponto.estado = estadoNovo;
        }
    }

    localStorage.setItem('cenas', JSON.stringify(cenaJson));
    montarCena(idCena)
    mostrarMenu('.examinar-items');

    // TODO: Apagar item após uso
}