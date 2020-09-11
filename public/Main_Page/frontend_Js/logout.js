async function logout() {
  document.cookie = "_q3e8bkdl3=; expires=Date.now()";
  document.cookie = "_csrf=; expires = Date.now()";
  window.location.href = "/";
  // const res = await fetch("api/auth/logout");
  // console.log(res);
  // if (res.resStatus === "Success") {
  //   if (res.redirectTo && res.msg == "redirect") {
  //     window.location = res.redirectTo;
  //   }
  // }
}

// }
