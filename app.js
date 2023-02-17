/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
const navLinks = document.querySelectorAll('nav > a');
function setActiveLink() {
  navLinks.forEach((link) => {
    link.style.color = '';
    link.style.textDecoration = '';
  });
}

navLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    setActiveLink(index);
  });
});

class AwesomeBooks {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  showBooks() {
    let booksHTML = '';
    if (this.books.length === 0) {
      document.querySelector('#Awsomebook-Container > p').style.display = 'block';
    } else {
      document.querySelector('#Awsomebook-Container > p').style.display = '';
    }
    this.books.forEach((book) => {
      booksHTML += `
        <div class='book'>
          <p>
            <span>"${book.title}"</span>
            by
            <span>${book.author}</span>
          </p>
          <button onClick='awesomeBooks.removeBook(${book.id})'>Remove</button>
        </div>
      `;
    });
    const booksContainer = document.querySelector('#book_list');
    booksContainer.innerHTML = booksHTML;
    window.location.href = '#Awsomebook-Container';
    setActiveLink(0);
  }

  addBook(title, author) {
    const id = Math.round(Math.random() * 10000);
    this.books = [...this.books, { id, title, author }];
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }
}

const awesomeBooks = new AwesomeBooks();
awesomeBooks.showBooks();

document
  .querySelector('#add_btn')
  .addEventListener('click', (event) => {
    event.preventDefault();
    const addBookForm = document.forms.add_book_form;
    const bookTitle = addBookForm.elements.title.value;
    const bookAuthor = addBookForm.elements.author.value;
    if (bookTitle.trim() !== '' && bookAuthor.trim() !== '') {
      awesomeBooks.addBook(bookTitle, bookAuthor);
      addBookForm.reset();
    }
  });

const dateTimeDisplay = document.querySelector('#display-date');
setInterval(() => {
  const date = new Date();
  const dateTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  dateTimeDisplay.innerHTML = `${date.toDateString()}, ${dateTime}`;
}, 1000);
