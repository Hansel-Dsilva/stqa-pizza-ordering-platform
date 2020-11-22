const login_form = document.getElementById("Login");
login_form.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault();
  // get details into variables: email, username, password
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("pass").value;

  const data = { login_email: email, pass: password };

  fetch("/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
      switch (response.status_id) {
        case 1:
          alert("This email does not exist! Please register first.");
          break;
        case 2:
          alert("Incorrect Password. Please try again.");
          break;
        case 3:
          // Store logged-in user's name locally
          sessionStorage.setItem("loggedInUsername", response.name);
          alert("Login successful");
          window.location.href = "index.html";
          break;
        default:
          console.log("Invalid status id: " + response.status_id);
      }
    });
};

// Registration submit logic
const reg_form = document.getElementById("Register");
reg_form.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault();
  // get details into variables: email, username, password, ph. no.
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pwd1").value;
  const uname = document.getElementById("user").value;
  const ph_no = document.getElementById("ph_no").value;

  const data = { email: email, pass: pass, uname: uname, ph_no: ph_no };

  fetch("/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
      switch (response.status_id) {
        case 0:
          alert("Registration failed. Please try again");
          break;
        case 1:
          alert(
            "This email has already been registered. Please try logging in."
          );
          break;
        case 2:
          alert("New user registered successfully. You may now Log In");
          window.location.href = "/";
          break;
        default:
          console.log("Invalid status id: " + response.status_id);
      }
    });
};
