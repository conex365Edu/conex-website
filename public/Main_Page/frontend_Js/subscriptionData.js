async function renderData() {
    const url = "/api/payment365/subscriptions";
  
    let response = await fetch(url);
  
    let data = await response.json();
    console.log(data)
  
    data.forEach((item) => {
      let template = `
        <tr>
          <td>${item.userId}</td>
          <td>${item.first}</td>
          <td>${item.last}</td>
          <td>${item.Phonenumber}</td>
          <td>${item.Email}</td>
          <td>${item.Amount}</td>
          <td>${item.Date}</td>
        </tr>
      `;
  
      let element = document.querySelector("#content-render");
      element.innerHTML += template;
    });
  }

  renderData();