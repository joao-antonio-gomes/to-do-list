var editaNomeItem = function (e) {
    var id = $(e.target).attr('data-value')
    var novoNome = $(`#edita-nome-${id}`);
    novoNome.focus();
    if (novoNome.val() == '') {
        mostraEscondeAlerta(`.alteracao-${id}`, 'Novo nome não pode ficar em branco!')
        return
    }
    arrayItens.forEach(function (element) {
        if (element.id == id) {
            element.descricao = novoNome.val();
            $(`#item-${id}`).text(novoNome.val());
        }
    })
    novoNome.val('')
    $(`#modal-${id}`).modal('hide');
    guardaItensLocalStorage();
}

var editarItemComClick = function (e) {
    $(".edita-nome").on("click", function (e) {
        editaNomeItem(e);
    });
}

var editarItemComEnter = function () { //adiciona item com Enter do teclado enquanto estiver com focus no input text
    $(".edita-item").keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            editaNomeItem(e);
        }
    });
}

var chamaModal = function () {
    $(".botao-editar").on('click', function (e) {
        var id = $(e.target).attr('data-value')
        var myModal = document.getElementById(`modal-${id}`)
        var myInput = document.getElementById(`edita-nome-${id}`)
        myModal.addEventListener('shown.bs.modal', function () {
            myInput.focus()
        })
    })
}