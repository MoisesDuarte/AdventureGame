function montarCena(nomeCena) {
    limparCena();

    let jsonCena = localStorage.getItem('cenas');
    let jsonInv = localStorage.getItem('inventario');
    let cenaJson = JSON.parse(jsonCena);
    let invJson = JSON.parse(jsonInv);
    let idCena;

    for (let i = 0; i < cenaJson.length; i++) {
        if (cenaJson[i].nome == nomeCena) {
            idCena = i;
        }
    }

    let background = 'url("img/' + cenaJson[idCena].fundo + '")';
    let arrayLocais = cenaJson[idCena].locais;
    let arrayPontos = cenaJson[idCena].pontosInteresse;
    let arrayAtores = cenaJson[idCena].atores;
    let arrayInventario = invJson;

    let cTela = document.querySelector('.tela-container');
    let cMovimento = document.querySelector('.movimento-items');
    let cExaminar = document.querySelector('.examinar-items');
    let cFalar = document.querySelector('.falar-items');
    let cInventario = document.querySelector('.inventario-items');
    let cInteracoes = document.querySelector('.inventario-interacoes');

    cTela.style.backgroundImage = background;

    let elementosLimpos = document.querySelectorAll('ul:not(.menu-items)');   
    for (let elemento of elementosLimpos) {
        let voltar = document.createElement('li');
        let hr = document.createElement('hr');
        voltar.id = 'voltar_' + elemento.className;
        hr.id = 'hr_' + elemento.className;
        voltar.innerHTML = 'VOLTAR';
        voltar.addEventListener('click', () => { mostrarMenu('.menu-items') });
        elemento.appendChild(voltar);
        elemento.appendChild(hr);
    }

    // Menus
    for (let local of arrayLocais) {
        let li = document.createElement('li');
        li.id = 'local_' + local.id;
        li.innerHTML = local.nome;
        li.addEventListener('click', () => { montarCena(local.nome) });
        cMovimento.appendChild(li);
    }

    for (let ponto of arrayPontos) {
        let li = document.createElement('li');
        li.id = 'ponto_' + ponto.id;
        li.innerHTML = ponto.nome;
        li.addEventListener('click', () => { mostrarTexto(ponto.descricoes[ponto.estado].descricao) });
        cExaminar.appendChild(li);
    }

    for (let ator of arrayAtores) {
        let li = document.createElement('li');
        li.id = 'ator_' + ator.id;
        li.innerHTML = ator.nome;
        li.addEventListener('click', () => { mostrarTexto(ator.falas[ator.estado].dialogo) });
        cFalar.appendChild(li);
    }    

    for (let item of arrayInventario) {
        let li = document.createElement('li');
        li.id = 'item_' + item.id;
        li.innerHTML = item.nome;
        li.addEventListener('click', () => { mostrarItem( item ) });
        cInventario.appendChild(li);
    }

    // Interações
    let intTitle = document.createElement('p');
    intTitle.innerHTML = 'USAR EM:';
    cInteracoes.appendChild(intTitle);

    for (let pontoInteracao of arrayPontos) {
        let li = document.createElement('li');
        li.id = 'interacao_' + pontoInteracao.nome;
        li.innerHTML = pontoInteracao.nome;
        li.addEventListener('click', () => { checarInteracao(idCena, pontoInteracao.nome, pontoInteracao.descricoes, 'ponto') });
        cInteracoes.appendChild(li);
    }

    for (let atorInteracao of arrayAtores) {
        let li = document.createElement('li');
        li.id = 'interacao_' + atorInteracao.nome;
        li.innerHTML = atorInteracao.nome;
        li.addEventListener('click', () => { checarInteracao(idCena, atorInteracao.nome, atorInteracao.falas, 'ator') });
        cInteracoes.appendChild(li);
    }
};


function limparCena() {
    let elementosAntigos = document.querySelectorAll('ul:not(.menu-items)');
    let textoAntigo = document.querySelector('.text-conteudo');
    for (let elemento of elementosAntigos) {
        elemento.innerHTML = "";
    }

    textoAntigo.innerHTML = "";
};


function guardarEstadoInicial() {
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
    let cInteracoes = document.querySelector('.inventario-interacoes');
    let itemAtivo = cInteracoes.dataset.itemAtivo;

    for (let trigger of objTriggers) {
        if (trigger.itemTrigger == itemAtivo) {
            console.log("Interação Válida");
            if (tipo == 'ator') {
                trocarEstadoAtor(idCena, nome, trigger.idEstado);
            } else if (tipo == 'ponto') {
                console.log("Interação com ponto");
            }
        }
    }
};


function trocarEstadoAtor(idCena, nomeAtor, estadoNovo) {
    let jsonStorage = localStorage.getItem('cenas');
    let cenaJson = JSON.parse(jsonStorage);

    for (let ator of cenaJson[idCena].atores) {
        if (ator.nome == nomeAtor) {
            ator.estado = estadoNovo;
        }
    }   
    
    localStorage.setItem('cenas', JSON.stringify(cenaJson));

    montarCena(cenaJson[idCena].nome);
}