function mostrarMenu(menu) {
    let el = document.body.querySelectorAll('ul');
    let novoEl = document.body.querySelector(menu);

    el.forEach(element => {
        element.style.display = 'none';
    });

    novoEl.style.display = 'block';
};


function mostrarTexto(arrayFalas) {
    let i = 0;
    let textContainer = document.querySelector('.text-container');
    let textConteudo = document.querySelector('.text-conteudo');
    let textNext = document.querySelector('.text-next');
    let atorFalas = arrayFalas;

    textConteudo.innerHTML = atorFalas[0];
    textNext.style.display = 'block';
    i++;

    bloquearMenu();

    textContainer.addEventListener('click', function avancarTexto(){
        if (i == atorFalas.length) {
            textConteudo.innerHTML = '';
            textNext.style.display = 'none';
            textContainer.removeEventListener('click', avancarTexto);
            permitirMenu();
        }

        while (i < atorFalas.length) {
            console.log(i + ' : ' + atorFalas[i]);
            textConteudo.innerHTML = atorFalas[i];
            i++;
            break;
        }
    });
};

function mostrarItem(arrayItem) {
    let cInteracoes = document.querySelector('.inventario-interacoes');
    let cText = document.querySelector('.text-conteudo');
    let elTitle = document.createElement('p');

    cInteracoes.dataset.itemAtivo = arrayItem.nome;
    
    cText.innerHTML = arrayItem.descricao;
    elTitle.innerHTML = 'USAR EM:';

    mostrarMenu('.inventario-interacoes');
};


function checarInteracao(objTriggers) {
    let cInteracoes = document.querySelector('.inventario-interacoes');
    let itemAtivo = cInteracoes.dataset.itemAtivo;
    console.log(itemAtivo)

    for (let trigger of objTriggers) {
        if (trigger.itemTrigger == itemAtivo) {
            console.log("Interação Válida");
        }
    }

}


function bloquearMenu() {
    let elMenus = document.querySelectorAll('li');
    for (let menu of elMenus) {
        menu.style.color = 'gray';
        menu.style.pointerEvents = 'none';
    }
};


function permitirMenu() {
    let elMenus = document.querySelectorAll('li');
    for (let menu of elMenus) {
        menu.style.color = 'var(--main-primary-color)';
        menu.style.pointerEvents = 'auto';
    }
};