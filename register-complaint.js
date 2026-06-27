const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");
};

const name=document.getElementById("name");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const description=document.getElementById("description");
const location1=document.getElementById("location");
const upload=document.getElementById("upload");
const date=document.getElementById("date");
const submit=document.getElementById("submit-btn");
const success=document.getElementById("success-message");
const complaintid=document.getElementsByClassName("complaint-id");


submit.onclick = function () {
const name1=name.value.trim();
const validname=/^[A-Za-z]+(?: [A-Za-z]+)*$/;

if(name1 ==""){ 
    name.placeholder="Name Required";
    name.style.border="3px solid red"; 
    return;  
}
else if(!validname.test(name1)){
     name.placeholder="Enter valid name";
     name.style.border="3px solid red";  
     return;
}
else{
     name.style.border="3px solid green";  
}


const email1=email.value.trim();
const validemail=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]+\.[A-Za-z]{2,}$/;

if(email1==""){
    email.placeholder="Email Required";
    email.style.border="3px solid red";
    return;
}
else if(!validemail.test(email1)){
    email.placeholder="Enter Valid Email";
    email.style.border="3px solid red";
    return;
}
else{
    email.style.border="3px solid green";
}

const number1=phone.value.trim();
const validnumber=/^\d{10}$/;

if(number1==""){
    phone.placeholder="Mobile Number Required";
    phone.style.border="3px solid red";
    return;
}
else if(!validnumber){
    phone.placeholder="Enter Valid Mobile Number ";
    phone.style.border="3px solid red";
    return;
}
else{
    phone.style.border="3px solid green";
}

};