async function subscribe() {
  //   const token = document
  //     .querySelector('meta[name="csrf-token"]')
  //     .getAttribute("content");
  const name = document.getElementById("name").value;
  const phonenumber = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  const data = JSON.stringify({
    buyer_name: name,
    phone: phonenumber,
    email: email,
  });
  console.log(data);

  const rawResponse = await fetch("/api/payment365/pay", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //   "CSRF-Token": token,
    },
    body: data,
  });

  const res = await rawResponse.json();
  window.location.href = res;
}
