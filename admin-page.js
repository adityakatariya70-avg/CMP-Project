const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");
};

const tablecontrols = document.getElementById("table-controls");
const searchbox = document.getElementById("search-box");
const filterbox = document.getElementById("filter-box");
const complaintable = document.getElementById("complaint-table");
const table = document.getElementById("table");
const tablerow = document.getElementById("table-row");
const viewbtn = document.getElementById("view-btn");
