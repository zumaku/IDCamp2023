// Deklarasi konstanta yang dibutuhkan
const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputBookForm = document.getElementById("inputBook");
const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
const completeBookshelfList = document.getElementById("completeBookshelfList");

// Event saat form disubmit
inputBookForm.addEventListener("submit", handleFormSubmit);

// Event untuk pencarian buku
const searchBookForm = document.getElementById("searchBook");
searchBookForm.addEventListener("submit", handleSearchSubmit);

// Memuat buku saat halaman dimuat
loadBooks();

// Fungsi untuk menangani submit form
function handleFormSubmit(event) {
    event.preventDefault();

    // Mendapatkan nilai dari input form
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;
    const year = inputBookYear.value;
    const isComplete = inputBookIsComplete.checked;

    // Memastikan input form terisi
    if (title && author && year) {
        // Membuat objek buku baru
        const book = createBook(+new Date(), title, author, year, isComplete);
        
        // Menambahkan buku ke rak yang sesuai
        addBookToShelf(book, isComplete);

        // Mengupdate data di penyimpanan lokal
        updateDataToStorage();

        // Membersihkan input form
        clearInputForm();
    } else {
        // Menampilkan peringatan jika input belum lengkap
        alert("Please fill in all the fields!");
    }
}

// Fungsi membersihkan inputan saat form telah disubmit
function clearInputForm() {
    // Membersihkan nilai input form
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
}

// Fungsi membuat buku
function createBook(id, title, author, year, isComplete) {
    // Membuat objek buku dengan properti yang diberikan
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
    // Membuat elemen buku dari objek buku
    const bookElement = createBookElement(book);

    // Menambahkan elemen buku ke rak yang sesuai
    if (isComplete) {
        completeBookshelfList.appendChild(bookElement);
    } else {
        incompleteBookshelfList.appendChild(bookElement);
    }
}

// Fungsi membuat elemen buku
function createBookElement(book) {
    // Membuat elemen HTML untuk buku
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

// Fungsi mengambil data dari penyimpanan
function getDataFromStorage() {
    // Mendapatkan data buku dari penyimpanan lokal
    const storageData = localStorage.getItem("books");
    return storageData ? JSON.parse(storageData) : [];
}

// Fungsi mengupdate data di penyimpanan
function updateDataToStorage() {
    // Mendapatkan data buku dari rak yang belum selesai
    const incompleteBooks = Array.from(incompleteBookshelfList.children).map(
        bookElementToData
    );

    // Mendapatkan data buku dari rak yang sudah selesai
    const completeBooks = Array.from(completeBookshelfList.children).map(
        bookElementToData
    );

    // Menggabungkan kedua data buku
    const books = [...incompleteBooks, ...completeBooks];

    // Menyimpan data buku ke penyimpanan lokal
    localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi menghapus buku dari rak dan penyimpanan
function deleteBook(id) {
    // Mendapatkan elemen buku dan data buku berdasarkan ID
    const bookElement = document.getElementById(id);
    const bookData = getBookById(id);

    // Memastikan elemen buku dan data buku ada sebelum dihapus
    if (bookElement && bookData) {
        // Menghapus elemen buku dari tampilan
        bookElement.remove();
        
        // Menghapus buku dari penyimpanan (localStorage)
        deleteBookFromStorage(id);

        // Memperbarui tampilan rak buku setelah menghapus buku
        refreshBookView();

        // Logging untuk memberi informasi di konsol
        console.log(`Book deleted: ${JSON.stringify(bookData)}`);
    }
}


// Fungsi menghapus buku/data di penyimpanan
function deleteBookFromStorage(id) {
    const books = getDataFromStorage();
    const updatedBooks = books.filter((book) => book.id != id);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
}



// Fungsi memasukkan data ke elemen
function bookElementToData(bookElement) {
    // Mendapatkan data buku dari elemen buku
    const id = bookElement.id;
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
    // Mendapatkan data buku dari penyimpanan lokal
    const books = getDataFromStorage();
    
    // Mencari buku dengan id tertentu
    return books.find((book) => book.id == id);
}

// Fungsi untuk mengubah status buku
function updateBookStatus(id, isComplete) {
    // Mendapatkan elemen buku berdasarkan id
    const bookElement = document.getElementById(id);
    
    // Mendapatkan data buku dari penyimpanan lokal
    const bookData = getBookById(id);

    // Memastikan elemen buku dan data buku tersedia
    if (bookElement && bookData) {
        // Mengupdate status buku
        bookData.isComplete = isComplete;

        // Hapus dan tambahkan kembali ke rak yang sesuai
        if (isComplete) {
            completeBookshelfList.appendChild(bookElement);
        } else {
            incompleteBookshelfList.appendChild(bookElement);
        }

        // Mengupdate data di penyimpanan lokal
        updateDataToStorage();
        console.log(`Book status updated: ${JSON.stringify(bookData)}`);
    }
}

// Fungsi untuk memperbarui tampilan elemen buku setelah perubahan status
function refreshBookView() {
    // Menghapus semua elemen buku dari rak
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";
    
    // Memuat ulang buku ke rak
    loadBooks();
}

// Fungsi untuk memindahkan buku ke rak yang sudah dibaca
function moveToCompleted(id) {
    updateBookStatus(id, true);
    
    // Memperbarui tampilan setelah perubahan status
    refreshBookView();
}

// Fungsi untuk memindahkan buku ke rak yang belum dibaca
function moveToIncomplete(id) {
    updateBookStatus(id, false);
    
    // Memperbarui tampilan setelah perubahan status
    refreshBookView();
}

// Fungsi untuk menangani submit form pencarian buku
function handleSearchSubmit(event) {
    event.preventDefault();

    // Mendapatkan nilai dari input form pencarian
    const searchTitle = document
        .getElementById("searchBookTitle")
        .value.toLowerCase();

    // Mendapatkan elemen rak buku yang belum selesai dan sudah selesai
    const incompleteBookshelfList = document.getElementById(
        "incompleteBookshelfList"
    );
    const completeBookshelfList = document.getElementById(
        "completeBookshelfList"
    );

    // Menghapus semua elemen buku dari rak
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    // Mendapatkan data buku dari penyimpanan lokal
    const books = getDataFromStorage();

    // Memfilter buku berdasarkan judul
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
}

// Fungsi untuk memuat buku saat halaman dimuat
function loadBooks() {
    // Mendapatkan data buku dari penyimpanan lokal
    const books = getDataFromStorage();

    // Menambahkan setiap buku ke rak yang sesuai
    books.forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookshelfList.appendChild(bookElement);
        } else {
            incompleteBookshelfList.appendChild(bookElement);
        }
    });
}
