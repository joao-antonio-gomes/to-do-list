var editaNomeItem = function (e) {
    var id = $(e.target).attr('data-value')
    var novoNome = $(`#edita-nome-${id}`);
    novoNome.focus();
    console.log('1')
    if (novoNome.val() === '') {
        mostraEscondeAlerta(`.alteracao-${id}`, 'Novo nome não pode ficar em branco!')
        return
    }
    console.log('2')
    arrayItens.forEach(function (element) {
        if (element.id == id) {
            element.descricao = novoNome.val();
            $(`#item-${id}`).text(novoNome.val());
        }
    })
    $(`#modal-${id}`).modal('hide');
    guardaItensLocalStorage();
    novoNome.val('')
}

var editarItemComClick = function (e) {
    $(".edita-nome").unbind().click(function (e) {
        editaNomeItem(e);
    });
}

var editarItemComEnter = function () { //adiciona item com Enter do teclado enquanto estiver com focus no input text
    $(".edita-item").unbind().keypress(function (e) {
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