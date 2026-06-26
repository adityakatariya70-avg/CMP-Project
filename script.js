const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

console.log(menuBtn);
console.log(navLinks);

menuBtn.onclick = function () {
    navLinks.classList.toggle("active");
}