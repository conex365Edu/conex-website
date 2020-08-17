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
  console.log(res.Email);
  console.log(res.error)
  const emailalert = document.getElementById("emailalert");

  console.log(res.msg);
  if (res.msg) {
    emailalert.style.display = "block";
  } else {
    emailalert.style.display = "none";
  }

}

function emailError() {
  const emailalert = document.getElementById("emailalert");
  emailalert.style.display = "none";
}

function contentValidation() {
  const name = document.getElementById("nameAlert");
  const phone = document.getElementById("phoneAlert");
  const email = document.getElementById("email");
  const native = document.getElementById("native");
  const expertise = document.getElementById("expertise");
  const description = document.getElementById("description");
  const suggestion = document.getElementById("suggestion");

  
}

contentValidation()