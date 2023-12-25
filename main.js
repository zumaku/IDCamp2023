const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const bookSubmitButton = document.getElementById("bookSubmit");
const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
);
const completeBookshelfList = document.getElementById("completeBookshelfList");

// Fungsi untuk membuat elemen HTML sesuai format yang diinginkan
function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Year: ${book.year}</p>
        <div class="action">
            <button class="green" onclick="toggleComplete(${book.id})">
                ${book.isComplete ? 'Belum Selesai' : 'Pindah ke Selesai'}
            </button>
            <button class="red" onclick="deleteBook(${book.id})">
                Delete Book
            </button>
        </div>
    `;
    return bookElement;
}

// Fungsi untuk menyimpan buku ke local storage
function saveBookToLocalStorage(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi untuk menampilkan buku pada halaman
function displayBooks() {
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.forEach((book) => {
        const bookElement = createBookElement(book);

        if (book.isComplete) {
            completeBookshelfList.appendChild(bookElement);
        } else {
            incompleteBookshelfList.appendChild(bookElement);
        }
    });
}

// Fungsi untuk menambahkan buku baru
function addBook() {
    const newBook = {
        id: +new Date(),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
        year: parseInt(inputBookYear.value),
        isComplete: inputBookIsComplete.checked,
    };

    saveBookToLocalStorage(newBook);
    displayBooks();

    // Clear input fields
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
}

 // Fungsi untuk memindahkan status isComplete
window.toggleComplete = function (id) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index].isComplete = !books[index].isComplete;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
};

// Fungsi untuk menghapus buku
window.deleteBook = function (id) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    }
};

// Fungsi untuk membersihkan input form pencarian
function clearSearchForm() {
    const searchBookTitleInput = document.getElementById('searchBookTitle');
    searchBookTitleInput.value = '';
}

// Event listener untuk form input buku
bookSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    addBook();
    clearSearchForm(); // Membersihkan form pencarian setelah menambahkan buku
});



// Fungsi untuk melakukan pencarian berdasarkan judul buku
function searchBooks(title) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const searchResult = books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
    );
    return searchResult;
}

// Event listener untuk form pencarian buku
const searchBookForm = document.getElementById('searchBook');
searchBookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchBookTitleInput = document.getElementById('searchBookTitle');
    const searchTerm = searchBookTitleInput.value;

    if (searchTerm.trim() !== '') {
        const searchResult = searchBooks(searchTerm);
        displaySearchResult(searchResult);
    } else {
        // Jika input pencarian kosong, tampilkan semua buku
        displayBooks();
    }
});

// Fungsi untuk menampilkan hasil pencarian
function displaySearchResult(searchResult) {
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    searchResult.forEach((book) => {
        const bookElement = createBookElement(book);

        if (book.isComplete) {
            completeBookshelfList.appendChild(bookElement);
        } else {
            incompleteBookshelfList.appendChild(bookElement);
        }
    });
}






// Menampilkan buku saat halaman dimuat
displayBooks();
