const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");
};

const contact_name = document.getElementById("contact-name");
const contact_email = document.getElementById("contact-email");
const contact_text = document.getElementById("contact-text");
const contact_button = document.getElementById("contact-send-btn");
const livebox = document.getElementById("livebox");


contact_button.addEventListener("click",validinfo);

function validinfo(){
  if(
  validname()&&
  validemail()&&
  validmessage()
  )
  {
    alert("Successfully Submitted!!");
    reset();
  }
}

function reset(){
contact_name.value="";
contact_name.style.border="";
contact_email.value="";
contact_email.style.border="";
contact_text.value="";
contact_text.style.border="";
}


function validname() {
  const name = contact_name.value.trim();
  const validname1=/^[A-Za-z ]{3,25}$/;

  if (name == "") {
    livebox.style.display="block";
     livebox.textContent="Name Required";
     contact_name.style.border="2px solid red";
    return false;
  }
   else if (!validname1.test(name)) {
     livebox.style.display="block";
      contact_name.style.border="2px solid red";
     livebox.textContent="Invalid Name";
    return false;
  }
  
  else{
     livebox.style.display="none";
   contact_name.style.border="2px solid green";
   return true;
  }
}

function validemail(){
  const email = contact_email.value.trim();
   const validemail = /^[A-Za-z0-9-_+%.]+@[A-Za-z0-9-_.]+\.[A-Za-z]{2,}$/;

   if (email == "") {
     livebox.style.display="block";
      contact_email.style.border="2px solid red";
    livebox.textContent="Email Required";
    return false;
  }

 
  else if (!validemail.test(email)) {
     livebox.style.display="block";
      contact_email.style.border="2px solid red";
   livebox.textContent="Email Invalid!!";
    return false;
  }
  else{
  livebox.style.display="none";
      contact_email.style.border="2px solid green";
      return true;
  }
}

function validmessage(){
  const message = contact_text.value.trim();
  if (message == "") {
     livebox.style.display="block";
      contact_text.style.border="2px solid red";
    livebox.textContent="Message Required";
    return false;
  } 
  else if (message.length > 100) {
     livebox.style.display="block";
      contact_text.style.border="2px solid red";
     livebox.textContent="message must only have letters less than 100.";
    return false;
  } 
  else{
    livebox.style.display="none";
      contact_text.style.border="2px solid green";
      return true;
  }
  
};
