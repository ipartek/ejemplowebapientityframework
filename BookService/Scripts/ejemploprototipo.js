'use strict';
var Person = function (name) {
    this.name = name;
    this.canTalk = true;
};
var p = new Person('Javier');
var Book = function (Title, Year, Price, Genre, AuthorId) {
    this.Title = Title;
    this.Year = Year;
    this.Price = Price;
    this.Genre = Genre;
    this.AuthorId = AuthorId;
};
Book.prototype.TituloAutor = function () {
    return this.Title + ", " + this.AuthorId;
};
var b = new Book('Titulo1', 2018, 12.34, 'Genero1', 2);
b.Yepa = 'lalaralalaaa';
var BookTS = /** @class */ (function () {
    function BookTS() {
    }
    return BookTS;
}());
;
var bts = new BookTS();
//# sourceMappingURL=ejemploprototipo.js.map