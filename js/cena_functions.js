function montarCena(nomeCena) {
    limparCena();

    let jsonStorage = localStorage.getItem('cenas');
    let cenaJson = JSON.parse(jsonStorage);
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

    let cTela = document.querySelector('.tela-container');
    let cMovimento = document.querySelector('.movimento-items');
    let cExaminar = document.querySelector('.examinar-items');
    let cFalar = document.querySelector('.falar-items');

    cTela.style.backgroundImage = background;

    let elementosLimpos = document.querySelectorAll('ul:not(.menu-items)');   
    for (let elemento of elementosLimpos) {
        let voltar = document.createElement('li');
        let hr = document.createElement('hr');
        voltar.innerHTML = 'VOLTAR';
        voltar.addEventListener('click', () => {mostrarItem('.menu-items')});
        elemento.appendChild(voltar);
        elemento.appendChild(hr);
    }

    let i = 0;
    for (let local of arrayLocais) {
        let li = document.createElement('li');
        li.id = 'local_' + local.id;
        li.innerHTML = local.nome;
        li.addEventListener('click', function() {montarCena(local.nome)});
        cMovimento.appendChild(li);
        i++;
    }

    i = 0;
    for (let ponto of arrayPontos) {
        let li = document.createElement('li');
        li.id = 'ponto_' + ponto.id;
        li.innerHTML = ponto.nome;
        li.addEventListener('click', function() {mostrarTexto(ponto.descricao)});
        cExaminar.appendChild(li);
        i++;
    }

    i = 0;
    for (let ator of arrayAtores) {
        let li = document.createElement('li');
        li.id = 'ator_' + ator.id;
        li.innerHTML = ator.nome;
        li.addEventListener('click', function() {mostrarTexto(ator.falas[ator.estado])});
        cFalar.appendChild(li);
        i++;
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


function guardarCenasInicial() {
    fetch('./cenas/_cenas.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        let stringJson = JSON.stringify(data);
        let cenaObj = JSON.parse(stringJson);

        localStorage.setItem('cenas', stringJson);
        location.reload();
    })
};


function trocarEstadoAtor(idCena, nomeAtor, estadoNovo) {
    let jsonStorage = localStorage.getItem('cenas');
    let cenaJson = JSON.parse(jsonStorage);

    for (let i = 0; i < cenaJson[idCena].atores.length; i++) {
        if (cenaJson[idCena].atores[i].nome == nomeAtor) {
            cenaJson[idCena].atores[i].estado = estadoNovo;
        }
    }
    
    localStorage.setItem('cenas', JSON.stringify(cenaJson));

    montarCena(cenaJson[idCena].nome);
}