$(function () {
    $("#sortable1").sortable({
        cancel: ".opcoes"
    });
    $("#sortable1").disableSelection();
});

function saveListOrder() {
    var li = document.querySelectorAll('.lista-geral .item-lista');
    var array = [];
    li.forEach(function (element, index) {
        array.push(parseInt(li[index].firstElementChild.value));
    });
    localStorage.setItem('ListItens', JSON.stringify(array));
}

function getListOrder() {
    var list = $(".lista-geral");
    var li = document.querySelectorAll('.lista-geral .item-lista');

    if (!localStorage.getItem('ListItens')) {
        return;
    }

    var itensStorage = JSON.parse(localStorage.getItem('ListItens'));

    list.empty();

    itensStorage.forEach(function (element, index) {
        list.append(criaElementoNaLista(itensStorage[index]));
    });

}