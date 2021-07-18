$(document).ready(function () {
    adicionarItemComClick();
    adicionarItemComEnter();
    carregaLocalStorageOnload();
});
const botaoAdiciona = $("#adicionar-item");
const inputEscreveItem = $('#nome-item');

var adicionarItemComClick = function () { //adiciona item com click esquerdo mouse no botão
    botaoAdiciona.on("click", function (e) {
        adicionaItemNaLista();
    });
}

var adicionarItemComEnter = function () { //adiciona item com Enter do teclado enquanto estiver com focus no input text
    inputEscreveItem.keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            adicionaItemNaLista();
        }
    });
}

var adicionaItemNaLista = function () {
    var nomeItem = inputEscreveItem.val();
    if (nomeItem.length == 0) { //verificação caso input esteja vazio
        erro[0] = "Por favor, adicione um item!";
        mostraEscondeAlerta(erro[0]);
    } else {
        if (salvaItemArray(nomeItem)) { //adiciona item na lista, limpa e volta foco pro campo input, e guarda array de itens no local storage
            criaElementoNaLista(nomeItem);
            inputEscreveItem.val('');
            inputEscreveItem.focus();
            guardaItensLocalStorage();
        } else {
            mostraEscondeAlerta(erro[0]);
        }
    }
}

var riscaItem = function () { //função para riscar o item quando input checkbox está checked
    $(".list-group-item").one('click', function (e) {
        var botao = $(e.target);
        if (botao.hasClass("marcar-feito")) {
            var valor = botao.val();
            var paragrafo = $(`#item-${valor}`);
            if (botao.prop("checked")) {
                paragrafo.addClass('riscado');
            } else {
                paragrafo.removeClass('riscado');
            }
        }
        else return;
    });
}

var removeItem = function () { //função para remover item da lista
    $(".list-group").one('click', function (e) {
        var botao = $(e.target);
        if (botao.hasClass("botao-apagar")) {
            if (window.confirm('Você realmente quer excluir esse item?')) {
                var valor = botao.val();
                var paragrafo = $(`#item-${valor}`);
                arrayItens.splice(arrayItens.indexOf(paragrafo.text()), 1);
                guardaItensLocalStorage(); //atualiza local storage quando faz remoção do item
                var elementoPai = $(e.target.parentNode); //linhas abaixos servem para animação dos itens e por fim a remoção da lista
                elementoPai.animate({ opacity: '0' }, 300, function () {
                    elementoPai.animate({ height: '0px' }, 150, function () {
                        elementoPai.remove();
                    })
                })
            }
        }
        else return;
    });
}

var alertaFaltaItem = function (string) { //função padrão para chamar alerta no botão adicionar
    $('.dica').tooltipster({
        trigger: 'click',
        animation: 'fade',
        speed: 1500,
        theme: 'tooltipster-shadow',
        content: string
    });
    $('.dica').tooltipster('disable');
}


var mostraEscondeAlerta = function (string) { //função para mostrar e esconder alertas
    var mostra;
    var esconde;

    alertaFaltaItem(string);

    clearTimeout(mostra);
    clearTimeout(esconde);
    mostra = setTimeout(function () {
        botaoAdiciona.tooltipster('enable');
        botaoAdiciona.tooltipster('show');
    }, 100);

    esconde = setTimeout(function () {
        botaoAdiciona.tooltipster('hide');
        botaoAdiciona.tooltipster('disable');
        botaoAdiciona.tooltipster('destroy');
    }, 2500);
}

function criaElementoNaLista(itemLista) {
    var ul = $('.list-group');  //captura ul no body onde serão anexadas as <li>

    //variaveis abaixo para criação de li
    var li = $('<li/>', {
        class: `list-group-item item-${arrayItens.indexOf(itemLista)}`
    });

    var input = $('<input>', {
        class: `form-check-input me-1 marcar-feito`,
        type: "checkbox",
        value: `${arrayItens.indexOf(itemLista)}`,
        onclick: "riscaItem()"
    });

    var p = $('<p/>', {
        id: `item-${arrayItens.indexOf(itemLista)}`,
        text: itemLista
    });

    var button = $('<button/>', {
        type: "button",
        class: `btn btn-sm btn-outline-danger botao-apagar`,
        value: `${arrayItens.indexOf(itemLista)}`,
        text: 'Excluir',
        onclick: "removeItem()"
    })

    //adiciona cada elemento dentro da <li> e no fim a <li> dentro da <ul>
    li = li.append(input);
    li = li.append(p);
    li = li.append(button);
    ul.append(li)

    //no momento que a li é criada é escondida para ter a animação dela surgindo com fadeIn
    li.hide();
    li.fadeIn()
}

//abaixo foram criadas funções e variáveis para verificação de palavras iguais e parecidas, mas que para o exercicio proposto foram retiradas
var arrayItens = [];
var erro = [];
var salvaItemArray = function (itemLista) {
    return arrayItens.push(itemLista);
    // if (arrayItens.length == 0 || verificaPorcentagemPalavras(arrayItens, itemLista) == false) {
    //     arrayItens.push(itemLista);
    //     return true;
    // }
    // return false;
}

// var verificaPorcentagemPalavras = function (arrayItens, itemLista) {
//     var percent = [];
//     var bool = false;
//     arrayItens.forEach((index) => {
//         percent.push(stringSimilarity.compareTwoStrings(index.toLowerCase(), itemLista.toLowerCase()));
//     });

//     percent.forEach((index) => {
//         if (index >= 0.85 && index <= 0.99) {
//             bool = true;
//             erro[0] = 'Você digitou um item parecido com esse, verifique novamente!';
//         } else if (index == 1) {
//             erro[0] = 'Já existe esse item na lista!';
//             bool = true;
//         }
//     })
//     return bool;
// }



// LOCAL STORAGE
var guardaItensLocalStorage = function () {
    localStorage.setItem('Lista', JSON.stringify(arrayItens));
}

var carregaLocalStorageOnload = function () {
    if (!localStorage.hasOwnProperty('Lista')) {
        console.log('nenhum item adicionado');
        return false;
    }
    arrayItens = JSON.parse(localStorage.getItem('Lista'));

    arrayItens.forEach(element => {
        criaElementoNaLista(element);
    });
}