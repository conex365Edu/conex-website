async function conexplusspeakerReg() {
  const name = document.getElementById("name").value;
  const phonenumber = document.getElementById("phonenumber").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;
  const expertise = document.getElementById("expertise").value;
  const charge = document.getElementById("charge").value;

  const data = JSON.stringify({
    Name: name,
    Phonenumber: phonenumber,
    Email: email,
    Location: location,
    Expertise: expertise,
    Charge: charge,
  });

  const rawResponse = await fetch("/api/registration/conexspeaker", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });

  const res = await rawResponse.json();
  console.log(res.Email);
  console.log(res.error);

  //Check For Validation Errors
  const errorAlert = document.getElementById("erroralert");
  if (res.error) {
    errorAlert.style.display = "block";
    errorAlert.innerHTML = res.error;
  } else {
    errorAlert.style.display = "none";
  }
  // const emailAlert = document.getElementById("emailalert");
  // if (res.Email) {
  //   emailAlert.style.display = "block";
  //   emailAlert.innerHTML = res.Email;
  // } else {
  //   emailAlert.style.display = "none";
  // }

  const emailError = document.getElementById("emailerror");
  if (res.msg) {
    emailError.style.display = "block";
    emailError.innerHTML = "Email is currently in use";
  } else {
    emailError.style.display = "none";
  }

  if (res._id) {
    $("#myModal").modal("show");
  } else {
    $("#myModal").modal("hide");
  }
}

function onloadError() {
  const errorAlert = document.getElementById("erroralert");
  errorAlert.style.display = "none";
  const emailAlert = document.getElementById("emailalert");
  emailAlert.style.display = "none";
  const emailError = document.getElementById("emailerror");
  emailError.style.display = "none";
}

function deleteUser(id) {
  console.log(id);
  var url = `/api/registration/conexplus/${id}`;
  fetch(url, {
    method: "DELETE",
  }).then((response) => {
    response.json().then((json) => {
      console.log(json);
      location.reload();
    });
  });
}
