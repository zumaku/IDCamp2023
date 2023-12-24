// Deklarasi semau constanta yang dibutuhkan
const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputBookForm = document.getElementById("inputBook");
const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
);
const completeBookshelfList = document.getElementById("completeBookshelfList");

// Event saat form disubmit
inputBookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;
    const year = inputBookYear.value;
    const isComplete = inputBookIsComplete.checked;

    if (title && author && year) {
        const book = createBook(Date.now(), title, author, year, isComplete);
        addBookToShelf(book, isComplete);
        updateDataToStorage();
        clearInputForm();
    } else {
        alert("Please fill in all the fields!");
    }
});

// Fungsi membersihkan inputan saat form telah disubmit
function clearInputForm() {
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
}

// Fungsi membuat buku
function createBook(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete,
    };
}

// Fungsi menambahkan buku ke rak
function addBookToShelf(book, isComplete) {
    const bookElement = createBookElement(book);
    if (isComplete) {
        completeBookshelfList.appendChild(bookElement);
    } else {
        incompleteBookshelfList.appendChild(bookElement);
    }
}

// FUngsi membuat elemen buku
function createBookElement(book) {
    const bookElement = document.createElement("article");
    bookElement.classList.add("book_item");
    bookElement.setAttribute("id", book.id);
    bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <div class="action">
                <button class="green" onclick="moveToCompleted(${book.id})">Move to Completed</button>
                <button class="red" onclick="deleteBook(${book.id})">Delete Book</button>
            </div>
        `;
    return bookElement;
}

// Fungsi mengambil data dari penyimpanan
function getDataFromStorage() {
    const storageData = localStorage.getItem("books");
    return storageData ? JSON.parse(storageData) : [];
}

// Fungsi mengupdate data di penyimpanan
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

// Fungsi menghapus buku/data di penyimpanan
function deleteBookFromStorage(id) {
    const books = getDataFromStorage();
    const updatedBooks = books.filter((book) => book.id != id);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
}

// Fungsi memasukkan data ke elemen
function bookElementToData(bookElement) {
    // const id = bookElement.id;
    const id = Date.now().toString();
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

// Fungsi mengambil id buku
function getBookById(id) {
    const books = getDataFromStorage();
    return books.find((book) => book.id == id);
}

// Fungsi mengubah status telah dibaca
function moveToCompleted(id) {
    const bookElement = document.getElementById(id);
    const bookData = getBookById(id);

    if (bookElement && bookData) {
        bookData.isComplete = true;
        completeBookshelfList.appendChild(bookElement);
        updateDataToStorage();
        console.log(`Book moved to completed: ${JSON.stringify(bookData)}`);
    }
}

// Fungsi menghapus buku
function deleteBook(id) {
    const bookElement = document.getElementById(id);
    const bookData = getBookById(id);

    if (bookElement && bookData) {
        bookElement.remove();
        deleteBookFromStorage(id);
        console.log(`Book deleted: ${JSON.stringify(bookData)}`);
    }
}

// Fungsi meload data dari penyimpanan ke tampilan
function loadBooks() {
    const books = getDataFromStorage();
    books.forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookshelfList.appendChild(bookElement);
        } else {
            incompleteBookshelfList.appendChild(bookElement);
        }
    });
}

loadBooks();




// Pencarian Buku
const searchBookForm = document.getElementById("searchBook");

    searchBookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();

        const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
        const completeBookshelfList = document.getElementById("completeBookshelfList");
        incompleteBookshelfList.innerHTML = "";
        completeBookshelfList.innerHTML = "";

        // Mengambil data dari penyimpanan
        const books = getDataFromStorage();

        // Memfilter buku
        books.forEach((book) => {
            if (book.title.toLowerCase().includes(searchTitle)) {
                const bookElement = createBookElement(book);
                if (book.isComplete) {
                    completeBookshelfList.appendChild(bookElement);
                } else {
                    incompleteBookshelfList.appendChild(bookElement);
                }
            }
        });
    });