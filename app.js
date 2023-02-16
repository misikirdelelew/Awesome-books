/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('awsomebook')) || [];
    this.booksContainer = document.querySelector('#create_top_section_container');
    this.submitButton = document.querySelector('#btn_submit');
    this.submitForm = document.forms.formElement;
    this.submitFormNameInput = this.submitForm.elements.name_input;
    this.submitFormAuthorInput = this.submitForm.elements.author_input;

    this.showBooks();
    this.addEventListeners();
  }

  addBook(title, author) {
    const id = Math.round(Math.random() * 100);
    const book = new Book(id, title, author);
    this.books.push(book);
    localStorage.setItem('awsomebook', JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(id) {
    const bookIndex = this.books.findIndex((b) => b && b.id === id);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      localStorage.setItem('awsomebook', JSON.stringify(this.books));
      this.showBooks();
    }
  }

  showBooks() {
    let booksHTML = '';
    this.books.forEach((b) => {
      booksHTML += `
        <div class='book_list'>
          <div class='details'>
            <p>"${b.title}"&nbsp;</p>
            <p>by &nbsp;</p>
            <p>${b.author}</p>
            </div>
          <button onClick='bookCollection.removeBook(${b.id})' class='btn_remove'>Remove</button>
        </div>
      `;
    });
    this.booksContainer.innerHTML = booksHTML;
  }

  addEventListeners() {
    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const bookTitle = this.submitFormNameInput.value;
      const bookAuthor = this.submitFormAuthorInput.value;
      if (bookTitle.length !== 0 && bookAuthor.length !== 0) {
        this.addBook(bookTitle, bookAuthor);
        this.submitForm.reset();
      }
    });
  }
}

const bookCollection = new BookCollection();