async function renderData() {

    const url = "/api/registration/conexspeaker";
  
    let response = await fetch(url);
  
    let data = await response.json();
  
    data.forEach((item) => {
  
    let template = `
      <tr>
        <td>${item._id}</td>
        <td>${item.Phonenumber}</td>
        <td>${item.Phonenumber}</td>
        <td>${item.Email}</td>
        <td>${item.Expertise}</td>
        <td>${item.Charge}</td>
        <td><button id="${item._id}" type="button" class="btn btn-dark" onclick="deleteUser(this.id)">Delete</button></td>
      </tr>
    `;
  
      let element = document.querySelector("#content-render");
      element.innerHTML += template;
    });
  }
  
  function deleteUser(id) {
    console.log(id);
    var url = `/api/registration/conexplusspeaker/${id}`;
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
  