const botaoAdiciona = $("#adicionar-item");
const inputEscreveItem = $('#nome-item');
const liRiscaApagaTodos = $('.risca-apaga-todos');
const liItensRiscados = $('.itens-riscados');

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
        mostraEscondeAlerta("Por favor, adicione um item!");
    } else {
        if (salvaItemArray(nomeItem)) { //adiciona item na lista, limpa e volta foco pro campo input, e guarda array de itens no local storage
            var itensAtivosRiscados = contaItensAtivos();
            if (itensAtivosRiscados[1] < itensAtivosRiscados[0]) { mostraLinha(liRiscaApagaTodos) }
            criaElementoNaLista();
            inputEscreveItem.val('');
            inputEscreveItem.focus();
            guardaItensLocalStorage();
        } else {
            mostraEscondeAlerta("Por favor, adicione um item!");
        }
    }
}

function criaElementoNaLista(id) {
    var ul = $('.lista-geral');  //captura ul no body onde serão anexadas as <li>

    var posicaoItemLista;
    if (id != undefined) {
        posicaoItemLista = id;
    } else {
        posicaoItemLista = arrayItens.length - 1;
    }

    //variaveis abaixo para criação de li
    var li = $('<li/>', {
        class: `list-group-item item-lista item-${posicaoItemLista}`
    });

    var input = $('<input>', {
        class: `form-check-input me-1 marcar-feito`,
        type: "checkbox",
        value: posicaoItemLista,
        onclick: "riscaItem()"
    });

    var p = $('<p/>', {
        id: `item-${posicaoItemLista}`,
        text: arrayItens.find((element) => { if (element["id"] == posicaoItemLista) return element }).descricao
    });

    var button = $('<i/>', {
        class: `bi bi-trash botao-apagar`,
        'data-value': posicaoItemLista,
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

//quando clica no botão verifica se todos itens estão riscados, evita bug de ter que clicar 2x para desmarcar, 
//serve principalmente no primeiro load da página
var verificaItensRiscados = function () {
    var c = 0;
    arrayItens.forEach((element) => {
        if (element.riscado) {
            c++;
        }
        if (element.status == "ativo") {
            c--;
        }
    })
    if (!c) {
        $(".risca-todos").attr('data-value', 'true');
    }
}