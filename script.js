const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");
};

const contact_name = document.getElementById("contact-name");
const contact_email = document.getElementById("contact-email");
const contact_text = document.getElementById("contact-text");
const contact_button = document.getElementById("contact-send-btn");

contact_button.onclick = function () {
  const name = contact_name.value.trim();
  if (name == "") {
    alert("Name must be Required!");
    return;
  }
   else if (name.length > 25) {
    alert("Name is too long!!");
    return;
  }

  const email = contact_email.value.trim();
  const validname = /^[A-Za-z ]{3,}$/;
  if (!validname.test(name)) {
    alert("InValid Name!!");
    return;
  }
   else if (email == "") {
    alert("Email must be Required");
    return;
  }

  const validemail = /^[A-Za-z0-9-_+%.]+@[A-Za-z0-9-_.]+\.[A-Za-z]{2,}$/;
  if (!validemail.test(email)) {
    alert("Email InValid");
    return;
  }

  const message = contact_text.value.trim();
  if (message == "") {
    alert("Enter your message!!");
    return;
  } 
  else if (message.length > 100) {
    alert("message must have letters less than 100.");
    return;
  } 
  
    alert("Contact Details send Successfully!!");
  
};
