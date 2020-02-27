// FUNÇÕES PARA MANUTENÇÃO DE INTERFACE
function mostrarMenu(menu) {
    let el = document.body.querySelectorAll('ul');
    let novoEl = document.body.querySelector(menu);

    // Trocando display de todos os elementos para invísivel (none)
    el.forEach(element => {
        element.style.display = 'none';
    });

    // Trocando display do elemento passado para visivel (block)
    novoEl.style.display = 'block';
};


function mostrarTexto(arrayFalas) {
    let i = 0;
    let textContainer = document.querySelector('.text-container');
    let textConteudo = document.querySelector('.text-conteudo');
    let textNext = document.querySelector('.text-next');
    let atorFalas = arrayFalas;

    // Mostrando a primeira fala
    textConteudo.innerHTML = atorFalas[0];
    textNext.style.display = 'block';
    i++;

    // Bloqueando interação com o menu
    bloquearMenu();

    // Adicionando eventListener a textContainer para avançar texto
    textContainer.addEventListener('click', function avancarTexto(){
        // Checando se a fala chegou ao fim
        if (i == atorFalas.length) {
            // Limpando elemento e removendo listener ao fim da fala
            textConteudo.innerHTML = '';
            textNext.style.display = 'none';
            textContainer.removeEventListener('click', avancarTexto);
            permitirMenu();
        }

        while (i < atorFalas.length) {
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

    // Passando nome do item para atributo na ul
    cInteracoes.dataset.itemAtivo = arrayItem.nome;
    
    // Colocando descrição na tela e mensagem no topo do menu items
    cText.innerHTML = arrayItem.descricao;
    elTitle.innerHTML = 'USAR EM:';

    // Mostrar as possíveis interações
    mostrarMenu('.inventario-interacoes');
};


function bloquearMenu() {
    // Selecionando todos os elementos li e bloqueando eventos de cursor
    let elMenus = document.querySelectorAll('li');
    for (let menu of elMenus) {
        menu.style.color = 'gray';
        menu.style.pointerEvents = 'none';
    }
};


function permitirMenu() {
    // Selecionando todos os elementos li e permitindo eventos de cursor
    let elMenus = document.querySelectorAll('li');
    for (let menu of elMenus) {
        menu.style.color = 'var(--main-primary-color)';
        menu.style.pointerEvents = 'auto';
    }
};