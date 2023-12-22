function createProductCard(data, category) {
    // Ambil elemen h2, cards_product, dan button menggunakan ID
    const h2Category = document.querySelector(`#${category} h2`);
    const cardsProductCategory = document.querySelector(`#${category} .cards_product`);
    const buttonCategory = document.querySelector(`#${category} .button`);

    // Isi teks pada elemen h2
    h2Category.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Mengubah huruf pertama menjadi kapital

    // Loop melalui data produk dan buat elemen card_product sesuai
    data.forEach(product => {
        // Buat elemen div dengan class "card_product"
        const cardProductElement = document.createElement("div");
        cardProductElement.className = "card_product";
        cardProductElement.style.backgroundImage = `url(${product.image})`;

        // Buat elemen p untuk nama produk
        const pElement = document.createElement("p");
        pElement.textContent = product.name;

        // Buat elemen div dengan class "rating"
        const ratingElement = document.createElement("div");
        ratingElement.className = "rating";

        // Loop untuk menambahkan bintang rating
        for (let i = 0; i < product.rating; i++) {
            const starImage = document.createElement("img");
            starImage.src = "assets/start.png";
            starImage.alt = "Star Rating";
            ratingElement.appendChild(starImage);
        }

        // Masukkan elemen p dan rating ke dalam elemen card_product
        cardProductElement.appendChild(pElement);
        cardProductElement.appendChild(ratingElement);

        // Masukkan elemen card_product ke dalam elemen cards_product
        cardsProductCategory.appendChild(cardProductElement);
    });

    // Isi teks pada elemen button
    buttonCategory.textContent = "Lainnya";
    buttonCategory.href = "#";
}

// Data produk untuk masing-masing kategori
const sepatuData = [
    {
        name: "Coklat Nike",
        image: "assets/produk_sepatu_4.png",
        rating: 5
    },
    {
        name: "Pandan Nike",
        image: "assets/produk_sepatu_3.png",
        rating: 4
    },
    {
        name: "Stending Nike",
        image: "assets/produk_sepatu_2.png",
        rating: 4
    },
    {
        name: "Reguler School",
        image: "assets/produk_sepatu_1.png",
        rating: 4
    }
];
const monitorData = [
    {
        name: "Tellu Monitor",
        image: "assets/produk_monitor_4.png",
        rating: 5
    },
    {
        name: "Monitor Polos",
        image: "assets/produk_monitor_3.png",
        rating: 4
    },
    {
        name: "Designer Oled",
        image: "assets/produk_monitor_2.png",
        rating: 4
    },
    {
        name: "Developer Oled",
        image: "assets/produk_monitor_1.png",
        rating: 4
    }
];
const bajuData = [
    {
        name: "Intel Harian",
        image: "assets/produk_baju_4.png",
        rating: 5
    },
    {
        name: "Kurang Kain",
        image: "assets/produk_baju_3.png",
        rating: 4
    },
    {
        name: "Batman Suit",
        image: "assets/produk_baju_2.png",
        rating: 4
    },
    {
        name: "Red Dress",
        image: "assets/produk_baju_1.png",
        rating: 4
    }
];

// Panggil fungsi untuk setiap kategori
createProductCard(sepatuData, "sepatu");
createProductCard(monitorData, "monitor");
createProductCard(bajuData, "baju");
