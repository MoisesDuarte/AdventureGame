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

function mostrarItem(item) {
    let cText = document.querySelector('.text-conteudo');
    let cExaminar = document.querySelector('.examinar-items');
    let elVoltar = document.querySelector('#hr_examinar-items');
    let elTitle = document.createElement('p');
    
    cText.innerHTML = item;
    elTitle.innerHTML = 'USAR EM:';
    cExaminar.insertBefore(elTitle, elVoltar.nextSibling);

    mostrarMenu('.inventario-interacoes');
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