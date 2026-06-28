

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");
};


const complaintidcolumn=document.getElementById("complaintid-column");
const numbercolumn=document.getElementById("number-column");
const submit=document.getElementById("submit-btn");
const complaintstatus=document.getElementById("complaint-status");
const timelinestatus=document.getElementById("timeline-status");

const namelivebox=document.getElementById("id-live-box");
const numberlivebox=document.getElementById("no-live-box");

complaintidcolumn.addEventListener("input",validid);
numbercolumn.addEventListener("input",validnumber);
submit.addEventListener("click",trackbtn);


function validid(){

   const complaintidcolumn1=complaintidcolumn.value.trim();
   const validcomplaintid=/^CMP\d{4}$/;
  
   
   if(complaintidcolumn1==""){
    complaintidcolumn.style.border="3 px solid red";
    namelivebox.style.display="block";
    namelivebox.textContent="Please enter your Complaint ID";
    return false;
   }
   else if(!validcomplaintid.test(complaintidcolumn1)){
     complaintidcolumn.style.border="3px solid red";
      namelivebox.style.display="block";
     namelivebox.textContent="Enter valid Complaint ID";
      return false;
   
   }
   else{
     complaintidcolumn.style.border="3px solid green";
     namelivebox.style.display="none";
     return true;
   }
}

function validnumber(){

   const numbercolumn1=numbercolumn.value.trim();
   const validnumber1=/^\d{10}$/;
   

   if(numbercolumn1==""){
    numbercolumn.style.border="3px solid red";
    numberlivebox.style.display="block";
    numberlivebox.textContent="Please enter Registered Mobile no.";
    return false;
   }
   else if(!validnumber1.test(numbercolumn1)){
    numbercolumn.style.border="3px solid red";
    numberlivebox.style.display="block";
     numberlivebox.textContent="Enter Valid Number";
    return false;
   
   }
   else{
    numbercolumn.style.border="3px solid green";
    numberlivebox.style.display="none";
    return true;
   }

}

function trackbtn(){

  if(
    validid()&&
    validnumber()
  )  {
  complaintstatus.style.display="block";
  timelinestatus.style.display="block";
  }

}