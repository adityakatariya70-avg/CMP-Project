const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");

};


const loginsection = document.getElementById("login-section");
const logincard = document.getElementById("login-card");
const email = document.getElementById("email");
const password = document.getElementById("password");
const eye = document.getElementById("eye");
const button = document.getElementById("login-btn");
const livebox = document.getElementById("bottom-text");

email.addEventListener("blur", validemail);
password.addEventListener("blur", validpassword);
button.addEventListener("click", success);

eye.onclick = function () {
  if (password.type == "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
};

function validemail() {
  const validemail1 = /^[A-Za-z0-9._+-]+@[A-Za-z0-9._+-]+\.[A-Za-z0-9]{2,}$/;
  if (email.value.trim() == "") {
    livebox.innerHTML = "Email Required";
    livebox.style.color = "red";
    livebox.style.fontSize = "18px";
    email.style.border = "2px solid red";
    return false;
  } else if (!validemail1.test(email.value)) {
    livebox.innerHTML = "Invalid Email";
    email.style.border = "2px solid red";
    livebox.style.color = "red";
    livebox.style.fontSize = "18px";
    return false;
  } else {
    email.style.border = "2px solid green";
    livebox.innerHTML = "Complaint Hub Administration Portal";
    livebox.style.color = "#666";
    livebox.style.fontSize = "14px";
    return true;
  }
}

function validpassword() {
  const validpassword1 = /^[A-Za-z0-9@ ]{8,}$/;

  if (password.value.trim() == "") {
    livebox.innerHTML = "Password Required";
    password.style.border = "2px solid red";
    livebox.style.color = "red";
    livebox.style.fontSize = "18px";
    return false;
  } else if (!validpassword1.test(password.value.trim())) {
    livebox.innerHTML = "Invalid Password";
    password.style.border = "2px solid red";
    livebox.style.color = "red";
    livebox.style.fontSize = "18px";
    return false;
  } else {
    password.style.border = "2px solid green";
    livebox.innerHTML = "Complaint Hub Administration Portal";
    livebox.style.color = "#666";
    livebox.style.fontSize = "14px";
    return true;
  }
}

function check() {
  const found = data.find(function (c) {
    return c.email == email.value.trim() && c.password == password.value.trim();
  });
  if (found) {
    return true;
  } else {
    return false;
  }
}

function success() {
  if (validemail() && validpassword() && check() == true) {
 
       window.location.href = "admin-page.html";
  } else {
    alert("Not found!!");
  }
}

const data = [
  {
    email: "adityakatariya70@gmail.com",
    password: "aditya@78286",
  },
  {
    email: "deepakkatariya29@gmail.com",
    password: "7828604020",
  },
];
