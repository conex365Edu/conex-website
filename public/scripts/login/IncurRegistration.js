async function Register() {
  var token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  const Name = document.getElementById("Name").value;
  const Address1 = document.getElementById("Address1").value;
  const Address2 = document.getElementById("Address2").value;
  const City = document.getElementById("City").value;
  const State = document.getElementById("State").value;
  const Zip = document.getElementById("Zip").value;
  const Number = document.getElementById("Number").value;
  const Email = document.getElementById("Email").value;
  const Gender = document.getElementById("Gender").value;
  const DOB = document.getElementById("DOB").value;
  const University = document.getElementById("University").value;
  const College = document.getElementById("College").value;
  const Stream = document.getElementById("Stream").value;
  const Percentage = document.getElementById("Percentage").value;
  const YearOfCompletion = document.getElementById("YearOfCompletion").value;
  const Remarks = document.getElementById("Remarks").value;
  const data = JSON.stringify({
    Name: Name,
    Address1: Address1,
    Address2: Address2,
    City: City,
    State: State,
    Zip: Zip,
    Number: Number,
    Email: Email,
    Gender: Gender,
    DOB: DOB,
    University: University,
    College: College,
    Stream: Stream,
    Percentage: Percentage,
    YearOfCompletion: YearOfCompletion,
    Remarks: Remarks,
  });

  const rawResponse = await fetch("/content/incur/services/api/incur/apply", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": token,
    },
    body: data,
  });
  const res = await rawResponse.json();

  const emailError = document.getElementById("emailAlert");
  if (res.msg) {
    emailError.style.display = "block";
    emailError.innerHTML = "Email is currently registered";
  } else {
    emailError.style.display = "none";
  }
  if (res.error) {
    emailError.style.display = "block";
    emailError.innerHTML = res.error;
  } else {
    emailError.style.display = "none";
  }

  if (res._id) {
    $("#myModal").modal("show");
    window.location.assign("https://rzp.io/l/InCurD20");
  } else {
    $("#myModal").modal("hide");
  }
}

function onloadMethod() {
  const emailError = document.getElementById("emailAlert");
  emailError.style.display = "none";
}
