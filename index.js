const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task.js");
const methodOverride = require("method-override");
const path = require("path");

mongoose
  .connect("", {
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

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.get("/taskmanager", async (req, res) => {
  const newTasks = await Task.find({ status: "new" });
  const inProgressTasks = await Task.find({ status: "in-progress" });
  const doneTasks = await Task.find({ status: "done" });
  const tasks = [newTasks, inProgressTasks, doneTasks];
  res.render("taskmanager.ejs", { tasks, index: 0 });
});

app.post("/taskmanager", (req, res) => {
  const newTask = new Task({
    status: "new",
    title: req.body.title,
    details: req.body.details,
  });
  newTask
    .save()
    .then((data) => {
      //   console.log(data);
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
  } else {
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
const resetDbAndStart = async () => {
  try {
    const msg = await Task.deleteMany({});
    app.listen(port, () => {
      console.log(`server started on port ${port}....`);
    });
  } catch (err) {
    console.log(err);
  }
};
resetDbAndStart();
