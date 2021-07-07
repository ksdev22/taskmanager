const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task.js");
const User = require("./models/user.js");
const methodOverride = require("method-override");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");

mongoose
  .connect("mongodb://localhost:27017/taskManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((data) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database ERROR");
  });
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "not a good secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.get("/requirecredentials", (req, res) => {
  res.render("reqcred.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.find({ username });
  console.log(existingUser);
  if (existingUser.length > 0) {
    req.flash("error", "Username already exists");
    return res.redirect("/requirecredentials");
  } else {
    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: hashedPw });
    console.log(newUser);
    await newUser.save();
    req.flash("success", "Registered successfuly, Login to continue");
    return res.redirect("/requirecredentials");
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect) {
      req.flash("success", "Successfuly logged in");
      req.session.user = foundUser._id;
      return res.redirect("/taskmanager");
    } else {
      req.flash("error", "Invalid credentials");
      return res.redirect("/requirecredentials");
    }
  } else {
    req.flash("error", "Invalid credentials");
    return res.redirect("/requirecredentials");
  }
});
app.post("/logout", (req, res) => {
  // req.session.destroy();
  req.session.user = null;
  req.flash("success", "Succesfuly logged out");
  res.redirect("/requirecredentials");
});
app.use((req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    return res.redirect("/requirecredentials");
  }
});

app.get("/taskmanager", async (req, res) => {
  const user = req.session.user;
  const username = await User.findById(user);
  const newTasks = await Task.find({ status: "new", user });
  const inProgressTasks = await Task.find({ status: "in-progress", user });
  const doneTasks = await Task.find({ status: "done", user });
  const tasks = [newTasks, inProgressTasks, doneTasks];
  res.render("taskmanager.ejs", { tasks, index: 0, username });
});

app.post("/taskmanager", (req, res) => {
  const newTask = new Task({
    status: "new",
    title: req.body.title,
    details: req.body.details,
    user: req.session.user,
  });
  newTask
    .save()
    .then((data) => {
      console.log(data);
      res.redirect("/taskmanager");
    })
    .catch((err) => {
      console.log("err adding new task");
    });
});
app.patch("/taskmanager", (req, res) => {
  if (req.query.drag == "true") {
    Task.findByIdAndUpdate(req.body.id, { status: req.body.status })
      .then((data) => {
        // console.log(data);
        res.end();
      })
      .catch((err) => {
        console.log("error while updating drag operation");
      });
  }
});
app.patch("/taskmanager/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body);
  res.redirect("/taskmanager");
});
app.delete("/taskmanager", (req, res) => {
  console.log(req.body);
  Task.findByIdAndDelete(req.body.id)
    .then((data) => {
      res.end();
    })
    .catch((err) => {
      console.log("error while deleting");
    });
});
let port = process.env.PORT || 80;
app.listen(port);
