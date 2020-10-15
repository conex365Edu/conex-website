async function renderIncurData() {
  const url = "/content/incur/services/incur/dataFetch";
  const response = await fetch(url);
  const data = await response.json();
  data.forEach((fetchItem) => {
    const templateData = `
        <tr>
            <td>${fetchItem.RegisterId}</td>
            <td>${fetchItem.Name}</td>
            <td>${fetchItem.Address1}</td>
            <td>${fetchItem.Address2}</td>
            <td>${fetchItem.City}</td>
            <td>${fetchItem.State}</td>
            <td>${fetchItem.Zip}</td>
            <td>${fetchItem.Number}</td>
            <td>${fetchItem.Email}</td>
            <td>${fetchItem.Gender}</td>
            <td>${fetchItem.DOB}</td>
            <td>${fetchItem.University}</td>
            <td>${fetchItem.College}</td>
            <td>${fetchItem.Stream}</td>
            <td>${fetchItem.Percentage}</td>
            <td>${fetchItem.YearOfCompletion}</td>
            <td>${fetchItem.Remarks}</td>
        </tr>
        `;

    const element = document.querySelector("#data-render");
    element.innerHTML += templateData;
  });
}
