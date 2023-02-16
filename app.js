let awsomebook = [];
function showBooks() {
  let booksHTML = '';
  awsomebook.forEach((b) => {
    booksHTML += `
        <div class='book_list'>
          <h3>${b.title}</h3>
          <p>${b.author}</p>
          <button onClick='removefromShelf(${b.id})' class='btn_remove'>Remove</button>
        </div>
      `;
  });
  const booksContainer = document.querySelector('#create_top_section_container');
  booksContainer.innerHTML = booksHTML;
}
function addBook(title, author) {
  const id = Math.round(Math.random() * 100);
  awsomebook.push({ id, title, author });
  localStorage.setItem('awsomebook', JSON.stringify(awsomebook));
  showBooks();
}

document
  .querySelector('#btn_submit')
  .addEventListener('click', (event) => {
    event.preventDefault();
    const addBookForm = document.forms.formElement;
    const bookTitle = addBookForm.elements.name_input.value;
    const bookAuthor = addBookForm.elements.author_input.value;
    if (bookTitle.length !== 0 && bookAuthor.length !== 0) {
      addBook(bookTitle, bookAuthor);
      addBookForm.reset();
    }
  });

// eslint-disable-next-line
function removefromShelf(bookId) {
  const bookIndex = awsomebook.findIndex((b) => b && b.id === bookId);
  awsomebook.splice(bookIndex, 1);
  localStorage.setItem('awsomebook', JSON.stringify(awsomebook));
  showBooks();
}

awsomebook = JSON.parse(localStorage.getItem('awsomebook')) || [];
showBooks();
