const botaoAdiciona = $("#adicionar-item");
const inputEscreveItem = $('#nome-item');
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
        mostraEscondeAlerta("#adicionar-item", "Por favor, escreva um item ao lado!");
    } else {
        if (salvaItemArray(nomeItem)) { //adiciona item na lista, limpa e volta foco pro campo input, e guarda array de itens no local storage
            criaElementoNaLista();
            inputEscreveItem.val('');
            inputEscreveItem.focus();
            ocultaLinhas();
        } else {
            mostraEscondeAlerta("#adicionar-item", "Por favor, escreva um item ao lado!");
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

    var botaoEditar = $('<a/>', {
        class: `bi bi-pencil-square botao-editar`,
        'data-value': posicaoItemLista,
        'data-bs-toggle': "modal",
        'data-bs-target': `#modal-${posicaoItemLista}`
    })

    var botaoApagar = $('<i/>', {
        class: `bi bi-trash botao-apagar`,
        'data-value': posicaoItemLista,
        onclick: "removeItem()",
        'data-bs-toggle': "modal",
        'data-bs-target': `#modal-apaga-${posicaoItemLista}`
    })

    var modalEditItem = $(`
    <div class="modal fade" id="modal-${posicaoItemLista}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
         data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Digite uma nova descrição para o item</h5>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control edita-item" placeholder="Novo nome do item" aria-label="Username"
                   aria-describedby="basic-addon1" id="edita-nome-${posicaoItemLista}" data-value="${posicaoItemLista}">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary edita-nome alteracao-${posicaoItemLista}" data-value="${posicaoItemLista}">Salvar</button>
                </div>
            </div>
        </div>
    </div>`)

    var modalApagaItem = $(`
    <div class="modal fade" id="modal-apaga-${posicaoItemLista}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
         data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Apagar item</h5>
                </div>
                <div class="modal-body">
                <p>Você tem certeza que deseja excluir o item abaixo? Não é possível voltar atrás.</p>
                <p class="item-exclusão item-abaixo-${posicaoItemLista}"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger apaga-item exclui-${posicaoItemLista}" data-value="${posicaoItemLista}">Excluir Item</button>
                </div>
            </div>
        </div>
    </div>`)

    //adiciona cada elemento dentro da <li> e no fim a <li> dentro da <ul>
    li = li.append(input);
    li = li.append(p);
    li = li.append(botaoEditar);
    li = li.append(botaoApagar);
    body = $(document.body);
    body.append(modalEditItem);
    body.append(modalApagaItem);
    ul.append(li)

    //no momento que a li é criada é escondida para ter a animação dela surgindo com fadeIn
    li.hide();
    li.fadeIn()
    editarItemComClick();
    editarItemComEnter();
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