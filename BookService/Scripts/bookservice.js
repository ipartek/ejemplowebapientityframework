var url = "/api/Books";

$(function () {
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
        $linea.find('a[href]').prop('href', url + "/" + libro.Id).click(librodetalle);

        $books.append($linea);

        console.log(key, libro);
    });
}

function librodetalle(e) {
    e.preventDefault();

    $.getJSON(this.href, function (libro) {
        $('#AuthorName').text(libro.Author.Name);
        $('#Title').text(libro.Title);
        $('#Year').text(libro.Year);
        $('#Genre').text(libro.Genre);
        $('#Price').text(libro.Price);
    });
}

function librosfallo(jqXHR, textStatus, errorThrown) {
    if (jqXHR.readyState === 0) {
        errorThrown = "ERROR DE CONEXIÓN";
    }

    console.log(jqXHR, textStatus, errorThrown);

    $('#cuadroerror').show();
    $('#textoerror').text(errorThrown);
}