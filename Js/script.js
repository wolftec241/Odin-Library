class Book {
    constructor(Title, Author, Number_of_pages, Read_status) {
        this.Title = Title;
        this.Author = Author;
        this.Number_of_pages = Number_of_pages;
        this.Read_status = Read_status;
    }

    //gets
    getTitle(){
        return this.Title;
    }
    getAuthor(){
        return this.Author;
    }
    getNumber_of_pages(){
        return this.Number_of_pages;
    }
    getRead_status(){
        return this.Read_status;
    }

    //sets
    setRead_status(new_read_status){
        this.Read_status = new_read_status;
    }
}


class myDOM {
    constructor() {
        this.bookListSection = document.getElementById("bookList");
        document.addEventListener('DOMContentLoaded', () => this.displayAllBooks());
    }

    addBook() {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;

        if (!title || !author || !pages) {
            alert("Please fill in all fields.");
            return;
        }

        const newBook = new Book(title, author, parseInt(pages), read);

        const books = this.loadBooksFromStorage();
        books.push(newBook);
        this.saveBooksToStorage(books);

        this.displayAllBooks();

        document.getElementById("addBookForm").reset();
        this.closeModal();
    }

    openModal() {
        document.getElementById("myModal").style.display = "block";
    }

    closeModal() {
        document.getElementById("myModal").style.display = "none";
    }

    displayAllBooks() {
        console.log("displayAllBooks called");
        this.bookListSection.innerHTML = ""; // Clear existing content
        const books = this.loadBooksFromStorage();
        console.log("Books loaded from storage:", books);
        books.forEach(book => this.displayBook(book));
    }

    displayBook(book) {
    console.log("Displaying book:", book);
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const deleteBtd = document.createElement("span");
    deleteBtd.classList.add("close");
    deleteBtd.innerHTML = "&times;";

    const Title = document.createElement("h3");
    const Author = document.createElement("p");
    const Pages = document.createElement("p");
    const Read_status = document.createElement("div");

    const Read_slider = document.createElement("label");
    const checkBox = document.createElement("input");
    const slider = document.createElement("span");

    const markAsReadText = document.createElement("p");
    markAsReadText.textContent = "Mark as Read:";
    Read_status.appendChild(markAsReadText);

    Read_status.classList.add("read_status");
    Read_slider.classList.add("read_slider");
    slider.classList.add("slider");
    checkBox.type = "checkbox";
    Read_slider.appendChild(checkBox);
    Read_slider.appendChild(slider);
    Read_status.appendChild(Read_slider);

    Title.textContent = `Title: ${book.Title}`;
    Author.textContent = `Author: ${book.Author}`;
    Pages.textContent = `Number of pages: ${book.Number_of_pages}`;

    checkBox.checked = book.Read_status;
    const setCardColor = () => {
        book.setRead_status(checkBox.checked);

        // Update localStorage with the new status
        const books = this.loadBooksFromStorage();
        const index = books.findIndex(b => b.Title === book.Title); // Find the correct book
        if (index !== -1) {
            books[index].Read_status = checkBox.checked;
            this.saveBooksToStorage(books); // Save updated books to storage
        }

        if (book.Read_status) {
            bookElement.classList.remove("not_finish");
        } else {
            bookElement.classList.add("not_finish");
        }
    };
    setCardColor();

    checkBox.addEventListener("change", () => setCardColor());

    bookElement.appendChild(deleteBtd);
    bookElement.appendChild(Title);
    bookElement.appendChild(Author);
    bookElement.appendChild(Pages);
    bookElement.appendChild(Read_status);

    this.bookListSection.appendChild(bookElement);

    deleteBtd.addEventListener("click", () => this.deleteBook(book));
}


    deleteBook(bookToDelete) {
        const books = this.loadBooksFromStorage();
        const index = books.findIndex(book => book.Title === bookToDelete.Title);

        if (index !== -1) {
            books.splice(index, 1);
            this.saveBooksToStorage(books);
        }

        this.displayAllBooks();
    }

    saveBooksToStorage(books) {
        localStorage.setItem("libraryBooks", JSON.stringify(books));
    }

    loadBooksFromStorage() {
        const storedBooks = localStorage.getItem("libraryBooks");
        console.log("Stored Books Raw Data:", storedBooks);
        const books = storedBooks ? JSON.parse(storedBooks) : [];
        return books.map(book => new Book(book.Title, book.Author, book.Number_of_pages, book.Read_status));
    }
}

const myDomInstance = new myDOM();

function openModal() {
    myDomInstance.openModal();
}

function closeModal() {
    myDomInstance.closeModal();
}

function addBook() {
    myDomInstance.addBook();
}

