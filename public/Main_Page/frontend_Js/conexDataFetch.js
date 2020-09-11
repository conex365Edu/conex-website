async function renderData() {
  const url = "/api/registration/conexplus";

  let response = await fetch(url);

  let data = await response.json();

  data.forEach((item) => {
    let template = `
      <tr>
        <td>${item._id}</td>
        <td>${item.Name}</td>
        <td>${item.Phonenumber}</td>
        <td>${item.Email}</td>
        <td>${item.Address}</td>
        <td>${item.Description}</td>
        <td><button id="${item._id}" type="button" class="btn btn-dark" onclick="deleteUser(this.id)">Delete</button></td>
      </tr>
    `;

    let element = document.querySelector("#content-render");
    element.innerHTML += template;
  });
}

function deleteUser(id) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  console.log(id);
  var url = `/api/registration/conexplus/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "CSRF-Token": token,
    },
  }).then((response) => {
    response.json().then((json) => {
      console.log(json);
      location.reload();
    });
  });
}

renderData();
