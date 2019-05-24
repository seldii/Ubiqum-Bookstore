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
    let rotateBtns = Array.from(document.getElementsByClassName("rotate-btn"));

    for (var i = 0; i < rotateBtns.length; i++) {
      //For each element in the container array, add an onclick event.
      rotateBtns[i].onclick = function (event) {
        this.parentElement.parentElement.classList.toggle('flipped');
      }

    }

  });


function displayBooks(data) {
  let searchTerm = document.forms["search-book"].querySelector("input").value;



  filteredBooks = data.filter(book => {
    let searchBookHere = book.titulo + book.descripcion;
    let searchBook = searchTerm.length === 0 || (searchBookHere.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);

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
    <a class="rotate-btn"><i class="fas fa-redo-alt"></i> Click here to see the description</a>
    
    <div class="card-body"><img src="` + filteredBooks[i].portada + `alt="" class="img-thumbnail">
    
    </div>
    
    </div>`; //end of the front 
    container += `<div class="card-back">
    <a class="rotate-btn"><i class="fas fa-redo-alt"></i> Click here to rotate</a>
    <div class="card-body">
    <h3 class="card-title">` + filteredBooks[i].titulo + `</h3>` + `<p class="card-text">` + filteredBooks[i].descripcion + `</p><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal` + [i] + `A">More Info</button>
    
    </div>
    </div>
    </div>
    <div class="modal fade" id="modal` + [i] + `A">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
            </div>
            <div class="modal-body">
            
            </div>
            <div class="modal-footer">
                <button type="button" class="close" data-dismiss="modal"></button>
            </div>

        </div>
    </div>`;
    container += '</div></div>';
    if (i % 3 == 2) {
      container += '</div>';
    }
  }

  container += `</div>`;
  shelves.innerHTML = container;

  let modalBodies = Array.from(document.getElementsByClassName("modal-body"));
  console.log(modalBodies);
  for (let j = 0; j < modalBodies.length; j++) {
    var carousel = '<div id="carouselControls'+ [j] + '" class="carousel slide" data-ride="carousel" data-pause="true">';
    carousel +=`<div class="carousel-inner">`;
    carousel += `<div class="carousel-item active"><img src="` + filteredBooks[j].detalle + `" alt="detalle" class="img-thumbnail">
    </div>`;
    for (let i = j+1; i < filteredBooks.length; i++) {
      carousel += `<div class="carousel-item">
      <img src="` + filteredBooks[i].detalle + `" alt="Second slide" class="img-thumbnail">
    </div>`;
    }
    carousel += `</div>
    <a class="carousel-control-prev" href="#carouselControls` + [j] + `" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselControls` + [j] + `" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>`
    
    modalBodies[j].innerHTML = carousel;

  }

}








