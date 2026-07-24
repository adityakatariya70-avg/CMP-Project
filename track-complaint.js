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
const failedlivebox = document.getElementById("failedlivebox");
const failedbtn = document.getElementById("failed-btn");
const trackcard = document.getElementById("track-card");

const namelivebox = document.getElementById("id-live-box");
const numberlivebox = document.getElementById("no-live-box");

complaintidcolumn.addEventListener("input", validid);
numbercolumn.addEventListener("input", validnumber);
submit.addEventListener("click", trackbtn);
failedbtn.addEventListener("click", resetform);

const trackcomplaintId = document.getElementById("track-complaintId");
const trackcategory = document.getElementById("track-category");
const trackdepartment = document.getElementById("track-department");
const trackstatus = document.getElementById("track-status");
const trackregisterdate = document.getElementById("track-register-date");
const trackupdatedate = document.getElementById("track-update-date");
const trackexpecteddate = document.getElementById("track-expected-date");

const submittedStep = document.getElementById("submitted-step");
const receivedStep = document.getElementById("received-step");
const reviewStep = document.getElementById("review-step");
const progressStep = document.getElementById("progress-step");
const resolvedStep = document.getElementById("resolved-step");

const submittedLine = document.getElementById("submitted-line");
const receivedLine = document.getElementById("received-line");
const reviewLine = document.getElementById("review-line");
const progressLine = document.getElementById("progress-line");

function resetform() {
  complaintidcolumn.value = "";
  numbercolumn.value = "";
  complaintidcolumn.style.border = "";
  numbercolumn.style.border = "";
  failedlivebox.style.display = "none";
  trackcard.style.display = "block";
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

function updateTimeline(status){

    const steps = [
        submittedStep,
        receivedStep,
        reviewStep,
        progressStep,
        resolvedStep
    ];

    const lines = [
        submittedLine,
        receivedLine,
        reviewLine,
        progressLine
    ];

    steps.forEach(step=>{
        step.classList.remove("completed");
        step.classList.remove("current");
    });

    lines.forEach(line=>{
        line.classList.remove("active-line");
    });

 

    switch(status){

        case "Pending":

            submittedStep.classList.add("completed");
            receivedStep.classList.add("current");
            submittedLine.classList.add("active-line");

            break;


        case "In Progress":

            submittedStep.classList.add("completed");
            receivedStep.classList.add("completed");
            reviewStep.classList.add("completed");
            progressStep.classList.add("current");

            submittedLine.classList.add("active-line");
            receivedLine.classList.add("active-line");
            reviewLine.classList.add("active-line");

            break;


        case "Resolved":

            submittedStep.classList.add("completed");
            receivedStep.classList.add("completed");
            reviewStep.classList.add("completed");
            progressStep.classList.add("completed");
            resolvedStep.classList.add("completed");

            submittedLine.classList.add("active-line");
            receivedLine.classList.add("active-line");
            reviewLine.classList.add("active-line");
            progressLine.classList.add("active-line");

            break;
        case "Rejected":
            submittedStep.classList.add("completed");
            receivedStep.classList.add("completed");
            reviewStep.classList.add("current");

            submittedLine.classList.add("active-line");
            receivedLine.classList.add("active-line");

         break;
          }
}
async function trackbtn() {
  if (!validid() || !validnumber()) {
    return;
  }

  const enteredData = {
    complaintId: complaintidcolumn.value.trim(),
    mobile: numbercolumn.value.trim(),
  };
  const response = await fetch("http://localhost:5000/api/complaint/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    const complaint = data.complaint;
    complaintstatus.style.display = "block";
    timelinestatus.style.display = "block";
    herosection.style.display = "none";

    trackcomplaintId.textContent = data.complaint.complaintId;
    trackcategory.textContent = data.complaint.category;
    let department = "";
    switch (complaint.category) {
      case "Electricity":
        department = "Electricity Department";
        break;
      case "Water Supply":
        department = "Water Supply Department";
        break;
      case "Road & Infrastructure":
        department = "Muncipal Corporation";
        break;
      case "Sanitation":
        department = "Sanitation Department";
        break;
      case "Street Light":
        department = "Electricity Department";
        break;
      case "Public Transport":
        department = "Transport Department";
        break;
      case "Government Office":
        department = "Government Department";
        break;
      case "Other":
        department = "Government Services Department";
        break;

      default:
        department = "General Department";
    }

    trackdepartment.textContent=department;
    trackstatus.textContent = data.complaint.status;
    trackregisterdate.textContent = new Date(complaint.createdAt,).toLocaleDateString();
    trackupdatedate.textContent = new Date(complaint.updatedAt,).toLocaleDateString();

    if(complaint.status=="Resolved"){
      trackexpecteddate.textContent="Complaint Resolved";
    }
    else if(complaint.status=="In Progress"){
      trackexpecteddate.textContent="Under Process";
    }
    else if(complaint.status=="Pending"){
      trackexpecteddate.textContent="Under Verification";
    }
    else{
      trackexpecteddate.textContent="Complaint Rejected!!";
    }
updateTimeline(complaint.status);
    
  } else {
    failedlivebox.style.display = "block";
    trackcard.style.display = "none";
  }
}
