async function updateAdmin(id) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = JSON.stringify({
    name: name,
    username: username,
    password: password,
  });

  var url = `/api/auth/update/${id}`;
  const rawresponse = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": token,
    },
    body: data,
  });

  const res = await rawresponse.json();
  const form = document.getElementById("resetForm");
  form.reset();

  if (res._id) {
    $("#myModal").modal("show");
  } else {
    $("#myModal").modal("hide");
  }
}

async function fetchData() {
  url = "/api/auth/update";
  const rawresponse = await fetch(url);
  var data = await rawresponse.json();
  data.forEach((item) => {
    let template = `
    <button id="${item._id}" type="button" class="btn btn-dark" onclick="updateAdmin(this.id)">Update</button>`;
    let element = document.querySelector("#button-render");
    element.innerHTML = template;
  });
}

fetchData();
