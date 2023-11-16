const navbar = document.querySelector("#navbar");
const humb = document.querySelector(".humb");
const back = document.querySelector("#back");
const menus = document.querySelector(".menus");

humb.addEventListener("click", () => {if(menus.classList.contains("menuopen"))menus.classList.remove("menuopen")})
back.addEventListener("click", () => {if(!menus.classList.contains("menuopen"))menus.classList.add("menuopen")})

