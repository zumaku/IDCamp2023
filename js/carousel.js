const list_kategori = [
    {
        label: "Teknologi",
        image: "assets/kategori_teknologi.png"
    }, {
        label: "Sepatu",
        image: "assets/kategori_sepatu.png"
    }, {
        label: "Kecantikan",
        image: "assets/kategori_kecantikan.png"
    }, {
        label: "Baju",
        image: "assets/kategori_baju.png"
    }
]


// Ambil elemen ul dengan id "splideList"
const splideList = document.getElementById("splideList");

// Loop melalui data kategori dan buat elemen-li sesuai
list_kategori.forEach(kategori => {
    // Buat elemen-li
    const liElement = document.createElement("li");
    liElement.className = "splide__slide";

    // Buat elemen-a
    const aElement = document.createElement("a");
    aElement.href = "#";
    aElement.className = "card";
    aElement.style.backgroundImage = `url(${kategori.image})`;
    aElement.textContent = kategori.label;
    console.log(aElement)

    // Masukkan elemen-a ke dalam elemen-li
    liElement.appendChild(aElement);

    // Masukkan elemen-li ke dalam elemen-ul
    splideList.appendChild(liElement);
});



// Fungsi mengecek lebar window untuk menentukan banyak kartu yang ditampilkan
const cekLebarWindow = () => {
    var lebarJendela = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(lebarJendela >= 1200){
        return {
            type: "loop",
            perPage: 3,
            perMove: 1,
        }
    } else if(lebarJendela >= 768 && lebarJendela < 1200){
        return {
            type: "loop",
            perPage: 2,
            perMove: 1,
        }
    } else if(lebarJendela < 768){
        return {
            type: "loop",
            perPage: 1,
            perMove: 1,
        }
    }
}

var splide = new Splide(".splide", cekLebarWindow())
splide.mount()


