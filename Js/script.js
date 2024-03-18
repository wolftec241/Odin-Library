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

class Library {
    constructor() {
        this.allBooksList = [];
    }

    addBookToLibrary(book) {
        this.allBooksList.push(book);
        console.table(this.allBooksList);
    }
}

class myDOM {
    constructor() {
        this.bookListSection = document.getElementById("bookList");
        this.library = new Library();
    }

    addBook() {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
    
        // Validate input (you can add more validation as needed)
        if ((!title || !author || !pages)){
            alert("Please fill in all fields.");
            return;
        }
    
        // Add the book to your library and display
        let newBook = new Book(title, author, parseInt(pages), read); 
        this.library.addBookToLibrary(newBook);
        this.displayBook(newBook);
        
        // Close the modal
        this.closeModal();
    
        // Reset the form
        document.getElementById("addBookForm").reset();
    }

    openModal() {
        document.getElementById("myModal").style.display = "block";
    }
    
    closeModal() {
        document.getElementById("myModal").style.display = "none";
    }

    windowClick(event) {
        const modal = document.getElementById("myModal");
        if (event.target === modal) {
            this.closeModal();
        }
    }

    displayAllBooks() {
        this.bookListSection.innerHTML = "";
        this.library.allBooksList.forEach(book => {
            this.displayBook(book);
        });
    }

    displayBook(book) {
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
            book.setRead_status(checkBox.checked);
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
    
        this.bookListSection.appendChild(bookElement);
        
        deleteBtd.addEventListener("click", () => {
            this.deleteBook(book);
        });
    }

    deleteBook(bookToDelete) {
        const index = this.library.allBooksList.findIndex(book => book === bookToDelete);

        if (index !== -1) {
            this.library.allBooksList.splice(index, 1);
        }

        const bookElementToDelete = Array.from(this.bookListSection.children).find(element => {
            const titleElement = element.querySelector("h3");
            return titleElement && titleElement.textContent.includes(bookToDelete.Title);
        });

        if (bookElementToDelete) {
            this.bookListSection.removeChild(bookElementToDelete);
        }

        this.displayAllBooks();
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
