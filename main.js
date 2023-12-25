const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputBookForm = document.getElementById("inputBook");
const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
const completeBookshelfList = document.getElementById("completeBookshelfList");

inputBookForm.addEventListener("submit", handleFormSubmit);

const searchBookForm = document.getElementById("searchBook");
searchBookForm.addEventListener("submit", handleSearchSubmit);

loadBooks();

function handleFormSubmit(event) {
    event.preventDefault();
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;
    const year = inputBookYear.value;
    const isComplete = inputBookIsComplete.checked;

    if (title && author && year) {
        const book = createBook(+new Date(), title, author, year, isComplete);
        addBookToShelf(book, isComplete);
        clearInputForm();
        clearInputSearchForm();
        updateDataToStorage();
        refreshBookView();
    } else {
        alert("Please fill in all the fields!");
    }
}

function clearInputForm() {
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
}

function clearInputSearchForm() {
    document.querySelector("#searchBookTitle").value = "";
}

function createBook(id, title, author, year, isComplete) {
    const parsedId = parseInt(id, 10);
    const parsedYear = parseInt(year, 10);
    
    return {
        id: parsedId,
        title,
        author,
        year: parsedYear,
        isComplete,
    };
}

function addBookToShelf(book, isComplete) {
    const bookElement = createBookElement(book);
    if (isComplete) {
        completeBookshelfList.appendChild(bookElement);
    } else {
        incompleteBookshelfList.appendChild(bookElement);
    }
}

function createBookElement(book) {
    const bookElement = document.createElement("article");
    bookElement.classList.add("book_item");
    bookElement.setAttribute("id", book.id);
    bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Year: ${book.year}</p>
        <div class="action">
            <button class="green" onclick="${book.isComplete ? 'moveToIncomplete' : 'moveToCompleted'}(${book.id})">
                ${book.isComplete ? 'Move to Uncompleted' : 'Move to Completed'}
            </button>
            <button class="red" onclick="deleteBook(${book.id})">Delete Book</button>
        </div>
    `;
    return bookElement;
}

function getDataFromStorage() {
    const storageData = localStorage.getItem("books");
    return storageData ? JSON.parse(storageData) : [];
}

function updateDataToStorage() {
    const incompleteBooks = Array.from(incompleteBookshelfList.children).map(
        bookElementToData
    );

    const completeBooks = Array.from(completeBookshelfList.children).map(
        bookElementToData
    );

    const books = [...incompleteBooks, ...completeBooks];
    localStorage.setItem("books", JSON.stringify(books));
}

function deleteBook(id) {
    const bookElement = document.getElementById(id);
    const bookData = getBookById(id);

    if (bookElement && bookData) {
        bookElement.remove();
        deleteBookFromStorage(id);
        refreshBookView();
        console.log(`Book deleted: ${JSON.stringify(bookData)}`);
    }
}

function deleteBookFromStorage(id) {
    const books = getDataFromStorage();
    const updatedBooks = books.filter((book) => book.id != id);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
}

function bookElementToData(bookElement) {
    const id = parseInt(bookElement.id, 10);
    const title = bookElement.querySelector("h3").innerText;
    const author = bookElement
        .querySelector("p:nth-child(2)")
        .innerText.substring(8);
    const year = bookElement
        .querySelector("p:nth-child(3)")
        .innerText.substring(6);
    const isComplete = bookElement.parentElement.id === "completeBookshelfList";
    return createBook(id, title, author, year, isComplete);
}

function getBookById(id) {
    const books = getDataFromStorage();
    return books.find((book) => book.id == id);
}

function updateBookStatus(id, isComplete) {
    const bookElement = document.getElementById(id);
    const bookData = getBookById(id);

    if (bookElement && bookData) {
        bookData.isComplete = isComplete;
        if (isComplete) {
            completeBookshelfList.appendChild(bookElement);
        } else {
            incompleteBookshelfList.appendChild(bookElement);
        }
        updateDataToStorage();
        console.log(`Book status updated: ${JSON.stringify(bookData)}`);
    }
}

function refreshBookView() {
    const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
    const completeBookshelfList = document.getElementById("completeBookshelfList");

    // Dapatkan filter yang aktif
    const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();

    // Memuat ulang buku sesuai dengan filter
    loadBooks(searchTitle, incompleteBookshelfList, completeBookshelfList);
}

function moveToCompleted(id) {
    updateBookStatus(id, true);
    refreshBookView();
}

function moveToIncomplete(id) {
    updateBookStatus(id, false);
    refreshBookView();
}

// Modifikasi handleSearchSubmit untuk memanggil refreshBookView setelah pemfilteran
function handleSearchSubmit(event) {
    event.preventDefault();
    refreshBookView(); // Hapus pemanggilan loadBooks di sini
}

function loadBooks() {
    const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();
    const books = getDataFromStorage();

    const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
    const completeBookshelfList = document.getElementById("completeBookshelfList");

    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    books.forEach((book) => {
        // Filter buku sesuai dengan judul
        if (book.title.toLowerCase().includes(searchTitle)) {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeBookshelfList.appendChild(bookElement);
            } else {
                incompleteBookshelfList.appendChild(bookElement);
            }
        }
    });
}
