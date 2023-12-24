const aside = document.querySelector(".biodata")
const tombol = document.querySelector(".tombol")

tombol.addEventListener("click", () => {
    aside.classList.toggle("muncul")
})