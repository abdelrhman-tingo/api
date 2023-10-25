const getBook = () => {
  let myReq = new XMLHttpRequest();
  let url = 'https://www.googleapis.com/books/v1/volumes?q=1';
  myReq.open('GET', url, true)
  myReq.send();
  myReq.addEventListener('readystatechange', function (){ 
    if (this.readyState === 4 && this.status === 200) { 
      let myRes = JSON.parse(myReq.responseText);
      const books = myRes.items
      let row = document.querySelector('.row');
      let coloums = '';
      books.forEach(book => {
        let title = book.volumeInfo.title.substr(0,20)
        let imgURL = book.volumeInfo.imageLinks.smallThumbnail
        let desc = book.volumeInfo.description || 'لا يوجد بيانات '
        let infoLink = book.volumeInfo.previewLink

        coloums += `
        <div class="col-sm-12 col-md-6 col-lg-4 mt-5">
            <div class="card bg-success text-center text-white p-3">
              <img src="${imgURL}"class="w-50 card-img-top m-auto"alt=""/>
              <h4 class="mt-4">${title}</h4>
              <p>
              ${desc}
              </p>
              <a href="${infoLink}" class="btn btn-secondary w-50 d-block m-auto">more info</a>
            </div><!-- card -->
            </div>
        `;
      });
      row.innerHTML = coloums;
    }
  })
}
let btn = document.getElementById('btn')
btn.addEventListener('click', getBook);