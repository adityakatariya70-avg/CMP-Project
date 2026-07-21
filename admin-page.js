const logoutbtn = document.getElementById("logout");
const tablecontrols = document.getElementById("table-controls");
const searchbox = document.getElementById("search-box-main");
const filterbox = document.getElementById("filter-box");
const complaintable = document.getElementById("complaint-table");
const tablebody = document.getElementById("table-body");
const rows = document.querySelectorAll("#table-body tr");
const complaintDetails=document.getElementById("complaint-details");

const totalnumber = document.getElementById("total-number");
const pendingnumber = document.getElementById("pending-number");
const progressnumber = document.getElementById("progress-number");
const resolvednumber = document.getElementById("resolved-number");

const complaintId=document.getElementById("complaintId");
const name=document.getElementById("name");
const category=document.getElementById("category");
const date=document.getElementById("date");
const status=document.getElementById("status");
const viewbtn=document.getElementsByClassName("view-btn");

const responsecomplaintId=document.getElementById("complaint-id");
const responsecomplaintname=document.getElementById("complaint-name");
const responsecomplaintemail=document.getElementById("complaint-email");
const responsecomplaintphone=document.getElementById("complaint-phone-number");
const responsecomplaintcategory=document.getElementById("complaint-category");
const responsecomplaintlocation=document.getElementById("complaint-location");
const responsecomplaintdate=document.getElementById("complaint-date");
const responsecomplaintimage=document.getElementById("complaint-image");
const responsecomplaintdescription=document.getElementById("complaint-description");
const updateStatus=document.getElementById("update-status");
const updateButton=document.getElementById("update-status-button");

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
  <td><button class="view-btn" data-id="${Complaint.complaintId}">   <i class="fa-solid fa-eye"></i> view</button></td>
  </tr>
  `
})

}
Table();
let currentComplaintId="";

tablebody.addEventListener("click", getComplaintDetails);

async function getComplaintDetails(event){

const clickedButton = event.target.closest(".view-btn");

if(!clickedButton){
  return 
}

const selectedComplaintid = clickedButton.dataset.id;
currentComplaintId=selectedComplaintid;

const response = await fetch(
  `http://localhost:5000/api/admin/complaints/${selectedComplaintid}`,
  {
    method:"GET",
    headers:{
      Authorization:`Bearer ${token}`
    },
  }
);
const data = await response.json();
console.log(data);
if(response.ok){
  complaintDetails.style.display="block";
  responsecomplaintId.textContent=data.complaint.complaintId;
  responsecomplaintname.textContent=data.complaint.name;
  responsecomplaintemail.textContent=data.complaint.email;
  responsecomplaintphone.textContent=data.complaint.mobile;
  responsecomplaintcategory.textContent=data.complaint.category;
  responsecomplaintlocation.textContent=data.complaint.location;
  responsecomplaintdate.textContent= new Date(data.complaint.createdAt).toLocaleDateString();
  responsecomplaintdescription.textContent=data.complaint.description;
updateStatus.value = data.complaint.status;

}

}

 updateButton.addEventListener("click", updateStatusfn);

async function updateStatusfn() {

  const selectedId = currentComplaintId;
  const selectedStatus = updateStatus.value;

  const response = await fetch(
    `http://localhost:5000/api/admin/complaints/${selectedId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status: selectedStatus
      }),
    }
  );

  const data = await response.json();

  if (response.ok) {

    Swal.fire({
      icon: "success",
      title: "Status Updated!",
      text: data.message,
      timer: 2000,
      showConfirmButton: false
    });

    complaintDetails.style.display = "none";

    DashboardStats();
    Table();

  } else {

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: data.message
    });

  }
}

logoutbtn.addEventListener("click", logout)

async function logout(event){
  event.preventDefault();
localStorage.removeItem("token");
window.location.href="admin-login.html";
}