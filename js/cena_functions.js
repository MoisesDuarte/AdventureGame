// FUNÇÕES PARA MANUTENÇÃO DE CENA
function montarCena(nomeCena) {
    limparCena();

    // Lendo arquivos JSON e guardando em objetos em localStorage
    let jsonCena = localStorage.getItem('cenas');
    let jsonInv = localStorage.getItem('inventario');
    let cenaJson = JSON.parse(jsonCena);
    let invJson = JSON.parse(jsonInv);

    // Procurando pelo id da cena com base em nome (passar diretamente o id seria melhor)
    let idCena;
    for (let i = 0; i < cenaJson.length; i++) {
        if (cenaJson[i].nome == nomeCena) {
            idCena = i;
        }
    }

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
    let cFalar = document.querySelector('.falar-items');
    let cInventario = document.querySelector('.inventario-items');
    let cInteracoes = document.querySelector('.inventario-interacoes');

    // Definindo imagem de fundo da cena
    cTela.style.backgroundImage = background;

    // Adicionando a opção voltar e um divisor no topo de cada lista
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

    // Adicionando opções a cada menu
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

    // Adicionando opções ao menu de interações
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
    montarCena(cenaJson[idCena].nome)
    mostrarMenu('.falar-items');

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
    montarCena(cenaJson[idCena].nome)
    mostrarMenu('.examinar-items');

    // TODO: Apagar item após uso
}