let url = "https://api.myjson.com/bins/udbm5"


fetch(url)
  .then(response => response.json())
  .then(function (books) {
    books = books.books;
    console.log(books);
    displayBooks(books);
    document.forms["search-book"].querySelector("input").addEventListener('keyup', () => {
      displayBooks(books)
    });
  });


function displayBooks(data) {
  let searchTerm = document.forms["search-book"].querySelector("input").value;



  filteredBooks = data.filter(book => {
    let bookName = book.titulo;
    let description = book.descripcion;
    console.log(description);
    let searchBook = searchTerm.length === 0 || (bookName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);

    return searchBook;
  })


  let container = `<div class="container">`;
  let shelves = document.getElementById("bookShelves");

  for (let i = 0; i < filteredBooks.length; i++) {

      if (i % 3 === 0) {
        container += `<div class="row">`;
      }
      container += '<div class="col-md-4">';
      container += `<div class="card card-flip h-100">
      <div class="card-front bg-dark">
      <div class="card-body"><img src="` + filteredBooks[i].portada + `alt="" class="img-thumbnail"></div></div>`;
      container +=`<div class="card-back">
      <div class="card-body">
      <h3 class="card-title">` +filteredBooks[i].titulo + `</h3>`;
      container+= `<p class="card-text">`+ filteredBooks[i].descripcion;
      container+=`</p></div></div>`;
      container += '</div></div>';
      if (i % 3 == 2) {
        container += '</div>';
      }
    }


  container += `</div>`;
  shelves.innerHTML = container;
}

