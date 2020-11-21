// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
// db.serialize(() => {
//   if (!exists) {
//     db.run("CREATE TABLE Auth (email TEXT PRIMARY KEY, user TEXT, pass TEXT)");
//     console.log("New table Auth created!");

//     // insert default dreams
//     db.serialize(() => {
//       db.run(
//         'INSERT INTO Auth (email, user, pass) VALUES ("test@gmail.com", "test", "test")'
//       );
//     });
//   } else {
//     console.log('Database "Auth" ready to go!');
//     db.each("SELECT * from Auth", (err, row) => {
//       if (row) {
//         console.log(`record: ${row.email}`);
//         // console.log("`record: ${row}`");
//       }
//     });
//   }
// });

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to get all the dreams in the database
// app.get("/getDreams", (request, response) => {
//   db.all("SELECT * from Dreams", (err, rows) => {
//     response.send(JSON.stringify(rows));
//   });
// });

// endpoint to add a dream to the database
// app.post("/addDream", (request, response) => {
//   console.log(`add to dreams ${request.body.dream}`);

//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects
//   // so they can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     const cleansedDream = cleanseString(request.body.dream);
//     db.run(`INSERT INTO Dreams (dream) VALUES (?)`, cleansedDream, error => {
//       if (error) {
//         response.send({ message: "error!" });
//       } else {
//         response.send({ message: "success" });
//       }
//     });
//   }
// });

// endpoint to clear dreams from the database
// app.get("/clearDreams", (request, response) => {
//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     db.each(
//       "SELECT * from Dreams",
//       (err, row) => {
//         console.log("row", row);
//         db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
//           if (row) {
//             console.log(`deleted row ${row.id}`);
//           }
//         });
//       },
//       err => {
//         if (err) {
//           response.send({ message: "error!" });
//         } else {
//           response.send({ message: "success" });
//         }
//       }
//     );
//   }
// });

app.post("/login", (request, response) => {
  // What should server do when client submits the login form:
  // check if login_email from request exists in Auth table
  db.get(
    "SELECT * FROM Auth WHERE email = ?",
    request.body.login_email,
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      // if not, return "DOESN'T EXIST"
      if (!row) {
        response.send({ status_id: 1, auth_status: "Account doesn't exist!" });
        return console.error("Account doesn't exist");
      }
      // compare login_pass with corresponding email in table
      if (row.pass != request.body.pass) {
        // if they don't match: return "INCORRECT"
        response.send({ status_id: 2, auth_status: "Incorrect pass!" });
        return console.error("Incorrect pass");
      }
      // log/alert: "Welcome back," + username
      response.send({ status_id: 3, auth_status: "Welcome back, " + row.user, name: row.user });
      return console.log("Welcome back, " + row.user);
    }
  );
});

app.post("/register", (request, response) => {
  console.log(JSON.stringify(request.body));
  // what should server do when client submits regtration form
  // check if login_email already exists in Auth table
  db.serialize(() => {
    db.get(
      "SELECT * FROM Auth WHERE email = ?",
      request.body.email,
      (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        // if yes, respond "ALREADY EXISTS!"
        if (row) {
          response.send({
            status_id: 1,
            auth_status: "Account already exists!"
          });
          return console.error("Account already exists");
        }
        // otherwise, simply add new user to Auth table
        db.run(
          "INSERT INTO Auth VALUES (?, ?, ?, ?)",
          request.body.email,
          request.body.uname,
          request.body.pass,
          request.body.ph_no,
          error => {
            if (error) {
              console.log(error);
              response.send({
                status_id: 0,
                auth_status: "Registration failed"
              });
            } else {
              response.send({
                status_id: 2,
                auth_status: "New user registered successfully"
              });
            }
          }
        );
      }
    );
  });
});

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// // endpoint to add a dream to the database
// app.post("/addDream", (request, response) => {
//   console.log(`add to dreams ${request.body.dream}`);

//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects
//   // so they can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     const cleansedDream = cleanseString(request.body.dream);
//     db.run(`INSERT INTO Dreams (dream) VALUES (?)`, cleansedDream, error => {
//       if (error) {
//         response.send({ message: "error!" });
//       } else {
//         response.send({ message: "success" });
//       }
//     });
//   }
// });

// // endpoint to clear dreams from the database
// app.get("/clearDreams", (request, response) => {
//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     db.each(
//       "SELECT * from Dreams",
//       (err, row) => {
//         console.log("row", row);
//         db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
//           if (row) {
//             console.log(`deleted row ${row.id}`);
//           }
//         });
//       },
//       err => {
//         if (err) {
//           response.send({ message: "error!" });
//         } else {
//           response.send({ message: "success" });
//         }
//       }
//     );
//   }
// });

// // helper function that prevents html/css/script malice
// const cleanseString = function(string) {
//   return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// };

// // listen for requests :)
// var listener = app.listen(process.env.PORT, () => {
//   console.log(`Your app is listening on port ${listener.address().port}`);
// });
