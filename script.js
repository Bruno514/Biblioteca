let library = [];

function Book(author, title, pagesNumber, haveRead = false) {
  this.author = author;
  this.title = title;
  this.pagesNumber = pagesNumber;
  this.haveRead = haveRead;
}

function CardElement(element, classes = []) {
  this.element = document.createElement(element);

  // Add all classes
  classes.forEach((element) => {
    this.element.classList.add(element);
  });
}

const findInputOnPage = function (inputName) {
  return inputName !== undefined
    ? document.querySelector(`input[name="${inputName}"]`)
    : null;
};

// DOM Elements
const formInputs = {
  $author: findInputOnPage("author"),
  $title: findInputOnPage("title"),
  $pagesNumber: findInputOnPage("pages-number"),
  $haveRead: findInputOnPage("have-read"),
};

const addBookToDOM = function (book) {
  const cardsContainer = document.querySelector(".books-cards-container");
  const card = document.createElement("div");
  card.classList.add("book-card");

  // Title section
  title = new CardElement("h1", ["book-title"]);
  title.element.innerText = book.title;
  card.appendChild(title.element);

  // Author section
  author = new CardElement("p", ["book-author"]);
  author.element.innerText = `Author: ${book.author}`;
  card.appendChild(author.element);

  // Pages number section
  pagesNumber = new CardElement("p", ["book-pages-number"]);
  pagesNumber.element.innerText = `Pages Number: ${book.pagesNumber}`;
  card.appendChild(pagesNumber.element);

  // Have read checkbox
  haveRead = new CardElement("input", ["book-have-read"]);
  haveRead.element.setAttribute("type", "checkbox");
  haveRead.element.innerText = "Have read?";
  haveRead.element.name = "have-read";

  // Have read label
  haveReadLabel = new CardElement("label");
  haveReadLabel.element.innerText = "Have Read?";
  haveRead.element.setAttribute("for", "have-read");

  haveRead.element.checked = book.haveRead;

  card.appendChild(haveRead.element);
  card.appendChild(haveReadLabel.element);

  // Remove button
  removeButton = new CardElement("button");
  removeButton.element.classList.add("book-remove-btn");
  removeButton.element.innerText = "X";
  removeButton.element.addEventListener("click", function (e) {
    this.parentElement.remove();
  });

  card.appendChild(removeButton.element);

  cardsContainer.appendChild(card);
};

const createBook = function (library) {
  const book = new Book(
    formInputs.$author.value,
    formInputs.$title.value,
    formInputs.$pagesNumber.value,
    formInputs.$haveRead.checked
  );

  // Check for empty fields
  for (const key in book) {
    if (book[key] === "") {
      return;
    }
  }

  library.push(book);
  addBookToDOM(book);
};

const toggleAddBookPopup = function () {
  let popup = document.querySelector(".popup");
  popup.classList.toggle("show");
};

const addPopupBtn = document.querySelector(".add-book-btn");
addPopupBtn.addEventListener("click", toggleAddBookPopup);

const bookSubmitBtn = document.querySelector('button[type="submit"]');
bookSubmitBtn.addEventListener("click", () => {
  createBook(library);
  toggleAddBookPopup()
});

// Default changes
bookSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();
});
