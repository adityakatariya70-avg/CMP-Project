const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.onclick = function () {
  navLinks.classList.toggle("active");
};

const complaintidcolumn = document.getElementById("complaintid-column");
const numbercolumn = document.getElementById("number-column");
const submit = document.getElementById("submit-btn");
const complaintstatus = document.getElementById("complaint-status");
const timelinestatus = document.getElementById("timeline-status");
const herosection = document.getElementById("hero-section");

const namelivebox = document.getElementById("id-live-box");
const numberlivebox = document.getElementById("no-live-box");

complaintidcolumn.addEventListener("input", validid);
numbercolumn.addEventListener("input", validnumber);
submit.addEventListener("click", trackbtn);



function resetform(){
  
  complaintidcolumn.value="";
  numbercolumn.value="";
  complaintidcolumn.style.border="";
  numbercolumn.style.border="";
}


function validid() {
  const complaintidcolumn1 = complaintidcolumn.value.trim();
  const validcomplaintid = /^CMP\d{4}$/;

  if (complaintidcolumn1 == "") {
    complaintidcolumn.style.border = "3px solid red";
    namelivebox.style.display = "block";
    namelivebox.textContent = "Please enter your Complaint ID";
    return false;
  } else if (!validcomplaintid.test(complaintidcolumn1)) {
    complaintidcolumn.style.border = "3px solid red";
    namelivebox.style.display = "block";
    namelivebox.textContent = "Enter valid Complaint ID";
    return false;
  } else {
    complaintidcolumn.style.border = "3px solid green";
    namelivebox.style.display = "none";
    return true;
  }
}

function validnumber() {
  const numbercolumn1 = numbercolumn.value.trim();
  const validnumber1 = /^\d{10}$/;

  if (numbercolumn1 == "") {
    numbercolumn.style.border = "3px solid red";
    numberlivebox.style.display = "block";
    numberlivebox.textContent = "Please enter Registered Mobile no.";
    return false;
  } else if (!validnumber1.test(numbercolumn1)) {
    numbercolumn.style.border = "3px solid red";
    numberlivebox.style.display = "block";
    numberlivebox.textContent = "Enter Valid Number";
    return false;
  } else {
    numbercolumn.style.border = "3px solid green";
    numberlivebox.style.display = "none";
    return true;
  }
}

function validfound() {
  const new1 = complaintidcolumn.value.trim();
  const new2 = numbercolumn.value.trim();

const foundcomplaint= complaint.find(function(c){
  return c.id==new1 && c.number==new2;
});
if(foundcomplaint){
  return true;
}
else{
    submit.innerHTML="Complaint Not Found!!";
    submit.style.background="yellow";
    submit.style.color="black";
     resetform();
  }

}

function trackbtn() {
  if (validid() && validnumber() && validfound()) {
      
     complaintstatus.style.display="block";
     timelinestatus.style.display="block";
     submit.innerHTML="Complaint Found";
     herosection.style.display="none";
  }
  
}

const complaint = [
  {
    id: "CMP1234",
    number: "7828604020",
  },
  {
    id: "CMP5656",
    number: "7000380652",
  },
  {
    id: "CMP4567",
    number: "9926931667",
  }
];
