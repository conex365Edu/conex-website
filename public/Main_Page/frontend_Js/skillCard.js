async function skillCardData() {
  let url = "/api/analytics/data";
  let res = await fetch(url);

  let data = await res.json();
  data.forEach((item) => {
    let template = `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.organization}</td>
        <td>${item.phone}</td>
        <td><button id="${item._id}" type="button" class="btn btn-dark" onclick="deleteUser(this.id)">Delete</button></td>
      </tr>
    `;

    let element = document.querySelector("#content-render");
    element.innerHTML += template;
  });
}

async function deleteUser(id) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  console.log(id);
  var url = `/api/analytics/data/${id}`;
  const raw = await fetch(url, {
    method: "DELETE",
    headers: {
      "CSRF-Token": token,
    },
  });
  const res = await raw.json();
  if (res) {
    location.reload();
  }
}

const id = document.getElementById("inputID").value;
const name = document.getElementById("inputName").value;
const organization = document.getElementById("inputOrganization").value;
const phone = document.getElementById("inputPhone").value;

function validateID(id) {
  //Error Text
  const idError = document.getElementById("idError");
  if (id === "") {
    idError.innerHTML = "ID cannot be empty";
    return false;
  } else if (id.length < 16 || id.length > 16) {
    idError.innerHTML = "Value of ID must be less than or equal to 16";
    return false;
  } else if (id) {
    idError.innerHTML = "";
    return true;
  }
}

function validateName(name) {
  const nameError = document.getElementById("nameError");
  if (name === "") {
    nameError.innerHTML = "Name cannot be empty";
    return false;
  } else if (name) {
    nameError.innerHTML = "";
    return true;
  }
}

function validateOrg(org) {
  const orgError = document.getElementById("orgError");
  if (org === "") {
    orgError.innerHTML = "Organization cannot be empty";
    return false;
  } else if (org) {
    orgError.innerHTML = "";
    return true;
  }
}

function validatePhone(phone) {
  const phoneError = document.getElementById("phoneError");
  if (phone === "") {
    phoneError.innerHTML = "Phone number cannot be empty";
    return false;
  } else if (phone.length > 10 || phone.length < 10) {
    phoneError.innerHTML = "Phone number must be 10 digit";
    return false;
  } else if (phone) {
    phoneError.innerHTML = "";
    return true;
  }
}

async function addSkillCard() {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  const id = document.getElementById("inputID").value;
  const name = document.getElementById("inputName").value;
  const organization = document.getElementById("inputOrganization").value;
  const phone = document.getElementById("inputPhone").value;

  const idValid = validateID(id);
  const nameValid = validateName(name);
  const orgValid = validateOrg(organization);
  const phoneValid = validatePhone(phone);
  console.log(idValid);
  console.log(nameValid);
  console.log(orgValid);
  console.log(phoneValid);
  if (
    idValid === true &&
    nameValid === true &&
    orgValid === true &&
    phoneValid === true
  ) {
    const data = JSON.stringify({
      Id: id,
      Name: name,
      Organization: organization,
      Phone: phone,
    });
    const rawResponse = await fetch("/api/analytics/skillCard", {
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
    if (res) {
      location.reload();
    }
  }
}

skillCardData();
