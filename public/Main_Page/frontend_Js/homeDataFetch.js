async function renderData() {
  const url = "/api/auth/adminData";

  let response = await fetch(url);

  let data = await response.json();

  data.forEach((item) => {
    let template = `
        <tr>
          <td>${item._id}</td>
          <td>${item.name}</td>
          <td>${item.username}</td>
        </tr>
      `;

    let element = document.querySelector("#content-render");
    element.innerHTML += template;
  });
}

renderData();
