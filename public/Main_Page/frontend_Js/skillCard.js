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

function deleteUser(id) {
  // const token = document
  //   .querySelector('meta[name="csrf-token"]')
  //   .getAttribute("content");
  console.log(id);
  var url = `/api/analytics/data/${id}`;
  fetch(
    url,
    {
      method: "DELETE",
    },
    (err, response) => {
      if (response) {
        location.reload();
      }
    }
  );
}

async function addSkillCard() {
  const id = document.getElementById("inputID").value;
  const name = document.getElementById("inputName").value;
  const organization = document.getElementById("inputOrganization").value;
  const phone = document.getElementById("inputPhone").value;

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
    },
    body: data,
  });
  const res = await rawResponse.json();
}

skillCardData();
