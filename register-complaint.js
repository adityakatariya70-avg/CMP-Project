const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
navLinks.classList.toggle("active");
};

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const category = document.getElementById("category");
const description = document.getElementById("description");
const location4 = document.getElementById("location");
const upload = document.getElementById("upload");
const date = document.getElementById("date");
const submit = document.getElementById("submit-btn");
const success = document.getElementById("success-message");
const uniqueid = document.getElementById("complaint-id");

const name_live_box = document.getElementById("name-live-box");
const email_live_box = document.getElementById("email-live-box");
const phone_live_box = document.getElementById("phone-live-box");
const category_live_box = document.getElementById("category-live-box");
const description_live_box = document.getElementById("description-live-box");
const location_live_box = document.getElementById("location-live-box");
const upload_live_box = document.getElementById("upload-live-box");
const date_live_box = document.getElementById("date-live-box");


name.addEventListener("input", validname);
email.addEventListener("input", validemail);
phone.addEventListener("input", validnumber);
description.addEventListener("input",validdescription);
location4.addEventListener("input",validlocation);
category.addEventListener("change",validcategory);
upload.addEventListener("change", validupload);
date.addEventListener("change",validdate);
submit.addEventListener("click",submitform);




function resetform(){
  const reset=document.getElementById("reset-form").reset();

  name.style.border="";
  email.style.border="";
  phone.style.border="";
  category.style.border="";
  description.style.border="";
  location4.style.border="";
  upload.style.border="";
  date.style.border="";

}


function validname() {
  const name1 = name.value.trim();
  const validname = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

  if (name1 == "") {
    name.style.border = "3px solid red";
    name_live_box.style.display = "block";  
    name_live_box.textContent = "Name Required";
    return false;
  } else if (!validname.test(name1)) {
    name_live_box.textContent = "Enter valid name";
    name_live_box.style.display = "block";
    name.style.border = "3px solid red";
    return false;
  } else {
    name.style.border = "3px solid green";
    name_live_box.style.display = "none";
    return true;
  }
}

function validemail() {
  const email1 = email.value.trim();
  const validemail = /^[A-Za-z0-9._+-]+@[A-Za-z0-9._+-]+\.[A-Za-z0-9]{2,}$/;

  if (email1 == "") {
    email.style.border = "3px solid red";
    email_live_box.style.display = "block";
    email_live_box.textContent = "Email Required";
    return false;
  } else if (!validemail.test(email1)) {
    email.style.border = "3px solid red";
    email_live_box.style.display = "block";
    email_live_box.textContent = "Enter valid Email";
    return false;
  } else {
    email.style.border = "3px solid green";
    email_live_box.style.display = "none";
    return true;
  }
}

function validnumber() {
  const phone1 = phone.value.trim();
  const validphone = /^\d{10}$/;

  if (phone1 == "") {
    phone.style.border = "3px solid red";
    phone_live_box.style.display = "block";
    phone_live_box.textContent = "Phone Required";
    return false;
  } else if (!validphone.test(phone1)) {
    phone.style.border = "3px solid red";
    phone_live_box.style.display = "block";
    phone_live_box.textContent = "Enter valid Number";
    return false;
  } else {
    phone.style.border = "3px solid green";
    phone_live_box.style.display = "none";
    return true;
  }
};

function validcategory(){
    const category1=category.value.trim();

    if(category1==""){
        category.style.border="3px solid red";
        category_live_box.style.display="block";
        category_live_box.textContent="Please select category";
        return false;
    }
    else{
        category.style.border="3px solid green";
        category_live_box.style.display="none";
        return true;
    }
}

function validdescription(){
const description1=description.value.trim();

if(description1==""){
    description.style.border="3px solid red";
    description_live_box.style.display="block";
    description_live_box.textContent="Description Required";
    return false;
}
else if(description1.length>400){
     description.style.border="3px solid red";
    description_live_box.style.display="block";
    description_live_box.textContent="400 words Limit";
    return false;
}
else {
     description.style.border="3px solid green";
    description_live_box.style.display="none";
    return true;
}
}

function validlocation(){
    const location1=location4.value.trim();
    const validlocation=/^[A-Za-z0-9\s,./-]{3,25}$/;

    if(location1==""){
        location4.style.border="3px solid red";
        location_live_box.style.display="block";
        location_live_box.textContent="Enter Location";
        return false;
    }
    else if(!validlocation.test(location1)){
        location4.style.border="3px solid red";
        location_live_box.style.display="block";
        location_live_box.textContent="Invalid Location";
        return false;
    }
    else{
        location4.style.border="3px solid green";
        location_live_box.style.display="none";
        return true;
    }
};

function validupload(){

    if(upload.files.length==0){
   upload.style.border="3px solid red";
   upload_live_box.style.display="block";
   upload_live_box.textContent="Upload Complaint Image";
   return false;
    }
    else{
        upload.style.border="3px solid green";
        upload_live_box.style.display="none";
        return true;
    }
}

function validdate(){
    if(date.value==""){
        date.style.border="3px solid red";
        date_live_box.style.display="block";
        date_live_box.textContent="Select Complaint Date";
        return false;
    }
    else{
         date.style.border="3px solid green";
        date_live_box.style.display="none";
    return true;
    }
}

function submitform(e){
    const Complaintid= "CMP"+ Math.floor(Math.random()*10000);
 e.preventDefault();

if(
  validname() &&
  validemail() &&
  validnumber() &&
  validcategory()&&
  validdescription() &&
  validlocation()&&
  validupload()&&
  validdate() 
){  
    success.style.display="block";
    uniqueid.style.display="block";
    uniqueid.textContent="Your Complaint ID : " + Complaintid;
    resetform();
    
}

}

