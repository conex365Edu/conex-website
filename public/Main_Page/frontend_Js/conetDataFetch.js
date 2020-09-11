async function renderData() {
  const url = "/api/registration/conet";

  let response = await fetch(url);

  let data = await response.json();

  data.forEach((item) => {
    let template = `
    <tr>
      <td>${item._id}</td>
      <td>${item.Name}</td>
      <td>${item.Phonenumber}</td>
      <td>${item.Email}</td>
      <td>${item.NativePlace}</td>
      <td>${item.Expertise}</td>      
      <td>${item.Workrole}</td>
      <td class="text-primary">${item.Suggestion}</td>
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
  var url = `/api/registration/conet/${id}`;
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
