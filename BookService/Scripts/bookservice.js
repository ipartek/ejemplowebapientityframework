var url = "/api/Books";
var urlAuthors = "/api/Authors";

$(function () {
    console.clear();

    $('#cuadroerror').hide();

    $linea = $('#books li');

    $linea.detach();

    console.log($linea);

    $.getJSON(url, libroscorrecto).fail(fallo);
    $.getJSON(urlAuthors, autorescorrecto).fail(fallo);

    $('#formbooks').submit(formsubmit);
});

function formsubmit(e) {
    e.preventDefault();

    var book = {
        "Title": $('#inputTitle').val(),
        "Year": $('#inputYear').val(),
        "Price": $('#inputPrice').val(),
        "Genre": $('#inputGenre').val(),
        "AuthorId": $('#authors').val()
    };

    console.log(JSON.stringify(book));

    $.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(book),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (libro) {
        console.log(libro);
        $.getJSON(url, libroscorrecto).fail(fallo);
    }).fail(fallo);
}

function autorescorrecto(autores) {
    $authors = $('#authors');

    $.each(autores, function (key, autor) {
        $authors.append(new Option(autor.Name, autor.Id));
    });
    
}

function libroscorrecto(libros) {
    $books = $('#books');

    $books.empty();

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

function fallo(jqXHR, textStatus, errorThrown) {
    if (jqXHR.readyState === 0) {
        errorThrown = "ERROR DE CONEXIÓN";
    }

    console.log(jqXHR, textStatus, errorThrown);

    $('#cuadroerror').show();
    $('#textoerror').text(errorThrown);
}
