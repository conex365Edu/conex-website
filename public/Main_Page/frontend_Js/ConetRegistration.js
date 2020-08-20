async function conetReg() {
  const name = document.getElementById("name").value;
  const phonenumber = document.getElementById("phonenumber").value;
  const email = document.getElementById("email").value;
  const native = document.getElementById("native").value;
  const expertise = document.getElementById("expertise").value;
  const description = document.getElementById("description").value;
  const suggestion = document.getElementById("suggestion").value;

  const data = JSON.stringify({
    Name: name,
    Phonenumber: phonenumber,
    Email: email,
    NativePlace: native,
    Expertise: expertise,
    Workrole: description,
    Suggestion: suggestion,
  });

  const rawResponse = await fetch("/api/registration/conet", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });

  const res = await rawResponse.json();

  //Check For Validation Errors
  const errorAlert = document.getElementById("erroralert");
  if (res.error) {
    errorAlert.style.display = "block";
    errorAlert.innerHTML = res.error;
  } else {
    errorAlert.style.display = "none";
  }

  const emailError = document.getElementById("emailerror");
  if (res.msg) {
    emailError.style.display = "block";
    emailError.innerHTML = "Email is currently in use";
  } else {
    emailError.style.display = "none";
  }

  const form = document.getElementById("content");
  form.reset();

  if (res._id) {
    $("#myModal").modal("show");
  } else {
    $("#myModal").modal("hide");
  }
}

function registerValid() {}

function onloadError() {
  const errorAlert = document.getElementById("erroralert");
  errorAlert.style.display = "none";
  const emailAlert = document.getElementById("emailalert");
  emailAlert.style.display = "none";
  const emailError = document.getElementById("emailerror");
  emailError.style.display = "none";
}

// function onloadError() {
//   const emailalert = document.getElementById("emailalert");
//   const namealert = document.getElementById("erroralert");
//   emailalert.style.display = "none";
//   erroralert.style.display = "none";
// }
// function deleteUser(id) {
//   console.log(id);
//   var url = `/api/registration/conet/${id}`
//   fetch(url, {
//     method: "DELETE"
//   }).then(response => {
//     response.json().then(json => {
//       console.log(json);
//       location.reload();
//     })
//   })
// }
