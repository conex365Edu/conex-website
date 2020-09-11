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
// function logout() {
//   var url = "/api/auth/logout";
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open("GET", url, false); // false for synchronous request
//   document.cookie = "jwt=; expires=Data.now()";
//   window.location.assign("/adminLogin");
// }
