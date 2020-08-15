async function login() {

    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    const username = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
  
    const data = JSON.stringify({
      username: username,
      password: password,
    });
  
    const rawResponse = await fetch("/api/auth/adminlogin", {   
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'CSRF-Token': token
      },
      body: data,
    });
    // submitBtn.addEventListener("click", function (evt) {
    //   evt.preventDefault();
    //   window.location.replace("/register");
    //   return false;
    // });
    window.location.assign("/AdminDashboard");
    console.log(rawResponse);
    const content = await rawResponse.json();
    console.log(content);
  }
  