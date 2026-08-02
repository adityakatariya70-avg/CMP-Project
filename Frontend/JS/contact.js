const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");
};

const contactform = document.getElementById("contact-form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const message = document.getElementById("message");
const button = document.getElementById("send-btn");
const livebox = document.getElementById("livebox");
const livebox2=document.getElementById("livebox2");



name.addEventListener("input", validname);
email.addEventListener("input",validemail);
mobile.addEventListener("input",validmobile);
message.addEventListener("input",validmessage);
button.addEventListener("click",success);

 function reset(){
 name.style.border="";
 name.value="";
 email.style.border="";
 email.value="";
 mobile.style.border="";
 mobile.value="";
 message.style.border="";
 message.value="";
 livebox2.style.display="none";
 }




function validname() {
  const validname1 = /^[A-Za-z ]{3,25}$/;

  if (name.value.trim() == "") {
    livebox.style.display = "block";
    livebox.textContent = "Please enter Name";
    name.style.border = "2px solid red";
    return false;
  } else if (!validname1.test(name.value)) {
    livebox.style.display = "block";
    name.style.border = "2px solid red";
    livebox.textContent = "Enter valid Name";
    return false;
  } else {
    livebox.style.display = "none";
    name.style.border = "2px solid green";
    return true;
  }
}

function validemail() {
  const validemail1 = /^[A-Za-z0-9._+-]+@[A-Za-z0-9._+-]+\.[A-Za-z0-9]{2,}$/;

  if (email.value.trim() == "") {
    livebox.style.display = "block";
     email.style.border = "2px solid red";
    livebox.textContent = "Please enter Email";
    return false;
  } else if (!validemail1.test(email.value)) {
    livebox.style.display = "block";
    email.style.border = "2px solid red";
    livebox.textContent = "Enter valid Email";
    return false;
  } else {
    livebox.style.display = "none";
    email.style.border = "2px solid green";
    return true;
  }
}

function validmobile() {
  const validnumber = /^\d{10}$/;

  if (mobile.value.trim() == "") {
    livebox.style.display = "block";
    mobile.style.border = "2px solid red";
    livebox.textContent = "Please enter Mobile no.";
    return false;
  } else if (!validnumber.test(mobile.value)) {
    livebox.style.display = "block";
    mobile.style.border = "2px solid red";
    livebox.textContent = "Enter valid number";
    return false;
  } else {
    livebox.style.display = "none";
    mobile.style.border = "2px solid green";
    return true;
  }
}

function validmessage() {
  const validmessage = /^[A-Za-z0-9\s.,!?()'-]{6,100}$/;

  if (message.value.trim() == "") {
    livebox.style.display = "block";
    message.style.border = "2px solid red";
    livebox.textContent = "Please enter Message";
    return false;
  } else if (!validmessage.test(message.value)) {
    livebox.style.display = "block";
    message.style.border = "2px solid red";
    livebox.textContent = "Enter valid Message (Less than 100 words)";
    return false;
  } else {
    livebox.style.display = "none";
    message.style.border = "2px solid green";
    return true;
  }
}


async function success() {
  if (!validname() || !validemail() || !validmobile() || !validmessage()) {
    return;
  }
  const enteredData = {
    name: name.value.trim(),
    email: email.value.trim(),
    mobile: mobile.value.trim(),
    message: message.value.trim(),
  };

  const response = await fetch("https://complainthub-backend-p1bg.onrender.com/api/admin/contact", {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify(enteredData),
  });

  const data = await response.json();

  if(response.ok){
    Swal.fire({
  icon: "success",
  title: "Message Sent!",
  text: "Thank you for contacting us. We'll get back to you soon.",
  confirmButtonColor: "#8B0000",
  confirmButtonText: "OK"
});
    reset();
  }

  }



