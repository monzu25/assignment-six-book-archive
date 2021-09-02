
const searchBooks = () => {
    const inputText = document.getElementById('input-field')
    const inputValue = inputText.value;
    const dataUrl = `http://openlibrary.org/search.json?q=${inputValue}`;
    //console.log(dataUrl);
    fetch(dataUrl)
        .then(res => res.json())
        .then(data => displayBooks(data))

    toggleLoader('block');
    inputText.value = ''
}



// Book Detail Display In card 

const displayBooks = books => {
    const allBooks = books.docs;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // if data not Found then Show Result 
    const result = document.getElementById('result-message');
    if (allBooks.length === 0) {
        result.innerText = "Result Not Found";
    }
    else {

        result.innerText = `Showing ${allBooks.length} of ${books.numFound}`;
    }

    // const loader = document.getElementById('loader');
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        if (book.author_name === undefined || book.first_publish_year === undefined) {
            div.innerHTML = `
            <div class="card h-100">     
              <div class="card-body">
              <img src='/image/No image.png' class="img-fluid">
                <h2 class="book-Name w-100">${book.title}</h2>
                <hr style="width:100%">
                <h4 class="card-title">Writer: Not Found</h4>
                <p  class="card-text text-right">First Edition: Not Found</p>     
               </div>
             </div>
             `;
        }
        else {
            div.innerHTML = `
            <div class="card h-100">     
              <div class="card-body">
                <img src='https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg' class="img-fluid">
                <h2 class="book-Name w-100">${book.title}</h2>
                <hr style="width:100%">
                <h5 class="card-title"> By: ${book.author_name}</h5>
                <p  class="card-text text-right">First Edition: ${book.first_publish_year}</p>     
                <p  class="card-text text-right">Publisher: ${book.publisher ? book.publisher[0] : "Unknow Publisher"}</p>     
               </div>
             </div>
             `;

        }
        searchResult.appendChild(div);

    });

    toggleLoader('none');
    // toggleSearchResult('block');


}




const toggleLoader = displayStyle => {
    document.getElementById('loader').style.display = displayStyle;
}

// const toggleSearchResult = displayStyle => {
//     document.getElementById('search-result').style.display = displayStyle;
// }



