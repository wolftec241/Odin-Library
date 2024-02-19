const myLibrary = [];
const bookListSection = document.getElementById("bookList");

function Book(Title, Author, Number_of_pages, Read_status) {
    this.Title = Title;
    this.Author = Author;
    this.Number_of_pages = Number_of_pages;
    this.Read_status = Read_status;
}

function addBookToLibrary(Title, Author, Number_of_pages, Read_status) {
    let book = new Book(Title, Author, Number_of_pages, Read_status);
    myLibrary.push(book);
    displayBook(book);
    console.table(myLibrary);
}

function addBook() {// Modal of adding a new book
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    // Validate input (you can add more validation as needed)
    if (!title || !author || !pages) {
        alert("Please fill in all fields.");
        return;
    }

    // Add the book to your library
    addBookToLibrary(title, author, parseInt(pages), read);

    // Close the modal
    closeModal();

    // Reset the form
    document.getElementById("addBookForm").reset();
}

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Close the modal if the user clicks outside the modal content
window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        closeModal();
    }
};


function displayAllBooks() {
    bookListSection.innerHTML = "";
    myLibrary.forEach(book => {
        displayBook(book);
    });
}

function displayBook(book) {
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

    checkBox.checked = book.Read_status; // Set checkbox state based on book data
    let setCardColor = function(){
        book.Read_status = checkBox.checked;
        if(book.Read_status){// If book mark as Read change color
            bookElement.classList.remove("not_finish");
        }
        else{
            bookElement.classList.add("not_finish");
        }
    }
    setCardColor();

    checkBox.addEventListener('change', function () {
        setCardColor();
    });

    bookElement.appendChild(deleteBtd);
    bookElement.appendChild(Title);
    bookElement.appendChild(Author);
    bookElement.appendChild(Pages);
    bookElement.appendChild(Read_status);

    bookListSection.appendChild(bookElement);
    
deleteBtd.addEventListener("click", function() {
        deleteBook(book);
    });

}

function deleteBook(bookToDelete) {
    // Find the index of the book in myLibrary
    const index = myLibrary.findIndex(book => book === bookToDelete);

    // Remove the book from myLibrary
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    // Find the corresponding book element in the DOM
    const bookElementToDelete = Array.from(bookListSection.children).find(element => {
        const titleElement = element.querySelector("h3");
        return titleElement && titleElement.textContent.includes(bookToDelete.Title);
    });

    // Remove the book element from the DOM
    if (bookElementToDelete) {
        bookListSection.removeChild(bookElementToDelete);
    }

    // Update the displayed books
    displayAllBooks();
}



myLibrary.push(new Book("a", "b", 256, false));
myLibrary.push(new Book("c", "d", 150, true));
myLibrary.push(new Book("e", "f", 300, false));

displayAllBooks();