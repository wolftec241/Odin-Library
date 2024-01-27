const myLibrary = [];

const bookListSection = document.getElementById("bookList");

function Book(Title, Author, Number_of_pages, Did_you_read) {
    this.Title = Title;
    this.Author = Author;
    this.Number_of_pages = Number_of_pages;
    this.Did_you_read = Did_you_read;
}

// Function that add a new book for the list of library's books
function addBookToLibrary(Title, Author, Number_of_pages, Did_you_read) {
    myLibrary.push(new Book(Title, Author, Number_of_pages, Did_you_read));
    displayBooks();
    console.table(myLibrary);
}

// Function to display books in the bookList section
function displayBooks() {

    // Clear existing content
    bookListSection.innerHTML = "";

    // Create and append book elements
    myLibrary.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `<h3>${book.Title}</h3><p>${book.Author}</p>`;
        bookListSection.appendChild(bookElement);
    });
}

myLibrary.push(new Book("a", "b", 256, false));
myLibrary.push(new Book("a", "b", 256, false));
myLibrary.push(new Book("a", "b", 256, false));
myLibrary.push(new Book("a", "b", 256, false));
displayBooks();