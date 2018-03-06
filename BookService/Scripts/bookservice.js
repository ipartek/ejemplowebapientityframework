$(function () {
    var url = "/api/Books";

    $('#cuadroerror').hide();

    $linea = $('#books li');

    $linea.detach();

    console.log($linea);

    $.getJSON(url, libroscorrecto).fail(librosfallo);
});

function libroscorrecto(libros) {
    $books = $('#books');

    $.each(libros, function (key, libro) {
        $linea = $linea.clone();

        $linea.find('.AuthorName').text(libro.Author.Name);
        $linea.find('.Title').text(libro.Title);

        $books.append($linea);

        console.log(key, libro);
    });
}

function librosfallo(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);

    $('#cuadroerror').show();
    $('#textoerror').text(errorThrown);
}