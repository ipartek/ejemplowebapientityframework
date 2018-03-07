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

    var bookId = $('#inputId').val();
    var esActualizacion = !!bookId;

    if (esActualizacion) {
        book.Id = bookId;

        $.ajax({
            url: url + "/" + bookId,
            method: 'PUT',
            data: JSON.stringify(book),
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (libro) {
            console.log(libro);
            limpiar();
            $.getJSON(url, libroscorrecto).fail(fallo);
        }).fail(fallo);
    }
    else
        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(book),
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (libro) {
            console.log(libro);
            limpiar();
            $.getJSON(url, libroscorrecto).fail(fallo);
            $('#authors').focus();
        }).fail(fallo);

    console.log(JSON.stringify(book));
}

function limpiar() {
    $('#inputId').remove();
    $('#tituloform').text('Add Book');
    $('#formbooks')[0].reset();
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
        $linea.find('.detalles').prop('href', url + "/" + libro.Id).click(librodetalle);
        $linea.find('.borrar').prop('href', url + "/" + libro.Id).click(libroborrar);
        $linea.find('.actualizar').prop('href', url + "/" + libro.Id).click(libroactualizar);

        $books.append($linea);

        console.log(key, libro);
    });
}

function libroactualizar(e) {
    e.preventDefault();

    $.getJSON(this.href, function (libro) {
        $('#authors').val(libro.AuthorId);
        $('#inputTitle').val(libro.Title);
        $('#inputYear').val(libro.Year);
        $('#inputGenre').val(libro.Genre);
        $('#inputPrice').val(libro.Price);

        $('#tituloform').text('UPDATE BOOK');

        if ($('#inputId').length)
            $('#inputId').val(libro.Id);
        else
            $('#formbooks').
                append('<input type="hidden" id="inputId" value="' + libro.Id + '" />');
    });
}


function libroborrar(e) {
    e.preventDefault();

    $.ajax({
        url: this.href,
        method: 'DELETE',
        //data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (libro) {
        console.log(libro);
        $.getJSON(url, libroscorrecto).fail(fallo);
    }).fail(fallo);
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
