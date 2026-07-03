const tablecontrols = document.getElementById("table-controls");
const searchbox = document.getElementById("search-box-main");
const filterbox = document.getElementById("filter-box");
const complaintable = document.getElementById("complaint-table");
const tablerow = document.getElementById("table-row");
const rows = document.querySelectorAll("#table-body tr");
const viewbtn = document.getElementsByClassName("view-btn");

searchbox.addEventListener("input", search_complaint);
filterbox.addEventListener("change", filter_complaint);

function filter_complaint() {
  const value = filterbox.value;

  rows.forEach(function (row) {
    const status = row.cells[4].textContent;

    if (value === "All") {
      row.style.display = "";
    } else if (value === status) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function search_complaint() {
  const value = searchbox.value.toUpperCase();
  rows.forEach(function (row) {
    const complaintid = row.cells[0].textContent.toUpperCase();

    if (complaintid.includes(value)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
