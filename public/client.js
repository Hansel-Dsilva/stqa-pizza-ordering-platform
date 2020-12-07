window.addEventListener("DOMContentLoaded", event => {
  console.log(sessionStorage.getItem("loggedInUsername"));
  // If logged in, display logged-in user's name & replace "Login/Register" button with "Logout"
  if (sessionStorage.getItem("loggedInUsername")) {
    document.getElementById("loggedIn").innerHTML += sessionStorage.getItem(
      "loggedInUsername"
    );
    login_btn = document.getElementById("login-btn");
    login_btn.text = "Logout";
    login_btn.removeAttribute("href");
    login_btn.onclick = () => {
      sessionStorage.clear();
      window.location.href = "/";
    };
  } else {
    document.getElementById("loggedIn").innerHTML = "Not Logged In";
  }
});
