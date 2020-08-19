// fetch("/api/registration/conet").then((data) => {
//   let template = `
//     <tr>
//       <td>${data.Name}</td>
//       <td>${data.Phonenumber}</td>
//       <td>${data.Email}</td>
//       <td>${data.Name}</td>
//       <td>${data.Name}</td>
//       <td>${data.Name}</td>
//       <td>${data.Name}</td>
//       <td class="text-primary"></td>
//     </tr> `;

//   let element = document.querySelector("#content-render");
//   element.innerHTML = template;
// });

async function renderData() {

  const url = "/api/registration/conet1";

  let response = await fetch(url);

  let data = await response.json();

  data.forEach((item) => {

  let template = `
    <tr>
      <td>${item._id}</td>
      <td>${item.Phonenumber}</td>
      <td>${item.Email}</td>
      <td>${item.Phonenumber}</td>
      <td>${item.Email}</td>
      <td>${item.NativePlace}</td>
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
  console.log(id);
  var url = `/api/registration/conet/${id}`;
  fetch(url, {
    method: "DELETE",
  }).then((response) => {
    response.json().then((json) => {
      console.log(json);
      location.reload();
    });
  });
}

renderData();
