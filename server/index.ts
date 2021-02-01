// TODO why does this solve the error?
// export {};
const express = require("express");
const path = require("path");
const models = require("../database/models");
const cookieParser = require("cookie-parser");
const app = express();
const port = 734;
const options = {
  maxAge: 2.592e9,
  httpOnly: true,
};

app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "../client", "public")));

app.post("/api/addUser", (req, res) => {
  models
    .saveUser(req.body.userName, req.body.password)
    .then((newUser) => {
      if (newUser) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => console.log(err));
});
// pass back userName and use it in useEffect query
app.post("/api/login", (req, res) => {
  models
    .login(req.body.userName, req.body.password)
    .then((userName) => {
      if (userName) {
        res.cookie("session", `${userName}`, options);
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => console.log(err));
});

app.post("/api/updateLocations", (req, res) => {
  if (req.body.locations) {
    models
      .updateLocations(
        req.body.userName,
        req.body.currentLocation,
        req.body.locations
      )
      .then(console.log(`Locations Updated`));
  } else {
    models
      .updateLocations(req.body.userName, req.body.currentLocation)
      .then(console.log("currentLocation only Updated"));
  }
});

app.post("/api/logout", (req, res) => {
  console.log("delete");
  res.clearCookie("session", options);
  res.send(false);
});

app.post("/api/updateFriends", (req, res) => {
  models
    .updateFriends(req.cookies.session, req.body.friends)
    .then(console.log("Friends Updated"));
});

// Also really intreested to have you help with the below
app.get("/api/users/:userName(\\w+)", (req, res) => {
  res.redirect(`/?userName=${req.params.userName}`);
});

app.get("/api/login", (req, res) => {
  if (req.cookies.session) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get("/api/users/", (req, res) => {
  let oneUser = {};
  let callback = (data) => {
    oneUser = JSON.stringify(data);
    res.send(oneUser);
  };
  let userName = req.query.userName || req.cookies.session;
  models.userInfo(userName, callback);
});

app.get("/api/allUsers", (req, res) => {
  let allUsers = {};
  let callback = (data) => {
    allUsers = JSON.stringify(data);
    res.send(allUsers);
  };
  models.allUserNames(callback);
});

app.listen(port, () => console.log(`Sorting Hat is listening on ${port}`));
