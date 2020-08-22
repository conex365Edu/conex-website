async function updateAdmin(id) {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = JSON.stringify({
    name: name,
    username: username,
    password: password,
  });

  var url = `/api/auth/update/${id}";`;
  const rawresponse = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });

  const res = await rawresponse.json();
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
