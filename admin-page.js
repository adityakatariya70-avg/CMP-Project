const logout = document.getElementById("logout");
const tablecontrols = document.getElementById("table-controls");
const searchbox = document.getElementById("search-box-main");
const filterbox = document.getElementById("filter-box");
const complaintable = document.getElementById("complaint-table");
const tablebody = document.getElementById("table-body");
const rows = document.querySelectorAll("#table-body tr");

const complaintdetails = document.getElementById("complaint-details");
const totalnumber = document.getElementById("total-number");
const pendingnumber = document.getElementById("pending-number");
const progressnumber = document.getElementById("progress-number");
const resolvednumber = document.getElementById("resolved-number");

const complaintId=document.getElementById("complaintId");
const name=document.getElementById("name");
const category=document.getElementById("category");
const date=document.getElementById("date");
const status=document.getElementById("status");
const viewbtn=document.getElementById("view-btn");

searchbox.addEventListener("input", search_complaint);
filterbox.addEventListener("change", filter_complaint);


function filter_complaint() {
  const value = filterbox.value;
  
const rows = document.querySelectorAll("#table-body tr");
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
  const rows = document.querySelectorAll("#table-body tr");
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


const token = localStorage.getItem("token");
console.log(token);

if (!token) {
  alert("Please Login First");
  window.location.replace("admin-login.html");
}

async function DashboardStats() {
  const response = await fetch(
    "http://localhost:5000/api/admin/complaints/dashboard",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();
  totalnumber.textContent = data.stats.totalComplaints;
  pendingnumber.textContent = data.stats.pendingComplaints;
  progressnumber.textContent = data.stats.inprogressComplaints;
  resolvednumber.textContent = data.stats.resolvedComplaints;
}
DashboardStats();

async function Table(){

const response = await fetch("http://localhost:5000/api/admin/complaints",{
  method:"GET",
  headers:{
    Authorization: `Bearer ${token}`,
  },
});
const tabledata= await response.json();

const Complaints =tabledata.Complaints;
tablebody.innerHTML="";

Complaints.forEach((Complaint)=>{
  tablebody.innerHTML += `
  <tr>
<td>${Complaint.complaintId}</td>
<td>${Complaint.name}</td>
<td>${Complaint.category}</td>
<td>${new Date(Complaint.createdAt).toLocaleDateString()}</td>
<td>${Complaint.status}</td>
  <td id="view-btn" data-id="${Complaint.complaintId}"><button class="view-btn">  <i class="fa-solid fa-eye"></i> view</button></td>
  </tr>
  `
})

}
Table();