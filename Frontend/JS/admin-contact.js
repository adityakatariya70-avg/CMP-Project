const token = localStorage.getItem("token");
console.log(token);
if (!token) {
  alert("Please Login First");
  window.location.replace("admin-login.html");
}

const totalNumber = document.getElementById("total-number");
const contactTable = document.getElementById("contact-table");
const tableRow = document.getElementById("table-row");
const tableName = document.getElementById("table-name");
const tableemail = document.getElementById("table-email");
const tabledate = document.getElementById("table-date");
const tablestatus = document.getElementById("table-status");
const tablebtn = document.getElementById("table-btn");

const contactDetails = document.getElementById("contact-details");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactMobile = document.getElementById("contact-mobile");
const contactDate = document.getElementById("contact-date");
const contactMessage = document.getElementById("contact-message");
const markBtn = document.getElementById("mark-btn");
const deleteBtn = document.getElementById("delete-btn");

const searchBox = document.getElementById("search-box-main");
const filterBox = document.getElementById("filter-box");

searchBox.addEventListener("input", searchContact);

async function searchContact() {
  const rows = document.querySelectorAll("#table-row tr");
  const value = searchBox.value.toUpperCase();

  rows.forEach((row) => {
    const contactName = row.cells[0].textContent.toUpperCase();
    if (contactName.includes(value)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

filterBox.addEventListener("change", filterContact);

async function filterContact() {
  const rows = document.querySelectorAll("#table-row tr");
  const value = filterBox.value;

  rows.forEach((row) => {
    const status = row.cells[3].textContent;

    if (value == "All") {
      row.style.display = "";
    } 
     else if (value === "Read") {
            if (status.includes("Read")) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }

        else if (value === "Unread") {
            if (status.includes("New")) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
  });
}

async function totalContact() {
  const response = await fetch("http://localhost:5000/api/admin/contact", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
  totalNumber.textContent = data.contact.length;
}
totalContact();

async function Table() {
  const response = await fetch("http://localhost:5000/api/admin/contact", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);

  const Contacts = data.contact;
  tableRow.innerHTML = "";

  Contacts.forEach((Contact) => {
    tableRow.innerHTML += `
<tr>
<td>${Contact.name}</td>
<td>${Contact.email}</td>
<td>${new Date(Contact.createdAt).toLocaleDateString()}</td>
<td>${Contact.isRead ? `<span class="status-read">🟢 Read</span>` : `<span class="status-new">🔴 New</span>`}</td>
  <td id="table-btn"><button class="view-btn" data-id="${Contact._id}"> <i class="fa-solid fa-eye"></i> View</button></td>
</tr>
`;
  });
}
Table();

tableRow.addEventListener("click", getContactDetails);

async function getContactDetails(event) {
  const clickedButton = event.target.closest(".view-btn");

  if (!clickedButton) {
    return;
  }
  Swal.fire({
    title: "Loading Contact Query...",
    text: "Please wait",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 1500));
  const selectedid = clickedButton.dataset.id;

  const response = await fetch(
    `http://localhost:5000/api/admin/contact/${selectedid}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();
  Swal.close();
  console.log(data);

  if (response.ok) {
    contactDetails.style.display = "block";
    contactName.textContent = data.contact.name;
    contactEmail.textContent = data.contact.email;
    contactMobile.textContent = data.contact.mobile;
    contactDate.textContent = new Date(
      data.contact.createdAt,
    ).toLocaleDateString();
    contactMessage.textContent = data.contact.message;
    markBtn.dataset.id = data.contact._id;
    deleteBtn.dataset.id = data.contact._id;
  }
}

markBtn.addEventListener("click", markRead);

async function markRead() {
  const id = markBtn.dataset.id;
  if (!id) {
    return;
  }
  const response = await fetch(
    `http://localhost:5000/api/admin/contact/${id}/read`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();
  console.log(data);
  if (response.ok) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: data.message,
      timer: 1500,
      showConfirmButton: false,
    });
    contactDetails.style.display="none";
    Table();
    totalContact();
  }
}

deleteBtn.addEventListener("click", deleteContact);

async function deleteContact() {
  const id = deleteBtn.dataset.id;
  if (!id) {
    return;
  }
  const response = await fetch(
    `http://localhost:5000/api/admin/contact/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();
  console.log(data);
  if (response.ok) {
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: data.message,
        confirmButtonColor: "#8b0000",
        timer: 1800,
        showConfirmButton: false,
      });

      contactDetails.style.display = "none";
      Table();
      totalContact();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: data.message,
        confirmButtonColor: "#8b0000",
      });
    }
  }
}
