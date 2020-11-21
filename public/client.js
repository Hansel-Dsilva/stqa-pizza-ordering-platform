// // client-side js
// // run by the browser each time your view template referencing it is loaded

// console.log("hello world :o");

// const dreams = [];

// // define variables that reference elements on our page
// const dreamsForm = document.forms[0];
// const dreamInput = dreamsForm.elements["dream"];
// const dreamsList = document.getElementById("dreams");
// const clearButton = document.querySelector('#clear-dreams');

// // request the dreams from our app's sqlite database
// fetch("/getDreams", {})
//   .then(res => res.json())
//   .then(response => {
//     response.forEach(row => {
//       appendNewDream(row.dream);
//     });
//   });

// // a helper function that creates a list item for a given dream
// const appendNewDream = dream => {
//   const newListItem = document.createElement("li");
//   newListItem.innerText = dream;
//   dreamsList.appendChild(newListItem);
// };

// // listen for the form to be submitted and add a new dream when it is
// dreamsForm.onsubmit = event => {
//   // stop our form submission from refreshing the page
//   event.preventDefault();

//   const data = { dream: dreamInput.value };

//   fetch("/addDream", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" }
//   })
//     .then(res => res.json())
//     .then(response => {
//       console.log(JSON.stringify(response));
//     });
//   // get dream value and add it to the list
//   dreams.push(dreamInput.value);
//   appendNewDream(dreamInput.value);

//   // reset form
//   dreamInput.value = "";
//   dreamInput.focus();
// };

// clearButton.addEventListener('click', event => {
//   fetch("/clearDreams", {})
//     .then(res => res.json())
//     .then(response => {
//       console.log("cleared dreams");
//     });
//   dreamsList.innerHTML = "";
// });

// client-side js
// run by the browser each time your view template referencing it is loaded

console.log("client.js :o");

// login submit logic
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
          document.cookie = response.name;
          alert("Login successful");
          window.location.href = "index.html";
          break;
        default:
          console.log("Invalid status id: " + response.status_id);
      }
      // console.log(response.message);
    });
};

// Registration submit logic
const reg_form = document.getElementById("Register");
reg_form.onsubmit = event => {
  // stop our form submission from refreshing the page
  // event.preventDefault();
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
          alert("Registration failed. Please try again")
          break;
        case 1:
          alert("This email has already been registered. Please try logging in.")
          break;
        case 2:
          alert("New user registered successfully. You may now Log In")
          break;
        default:
          console.log("Invalid status id: " + response.status_id);
      }
    });
};
