const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const db = require("./mongodb.js");

app.use("/", express.static("public"));

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/api/new-message", (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const message = req.query.message;
  db
    .addMessage(name, message)
    .then(result => {
      console.log("inserted");
      res.send("query added");
      io.emit("new message", { name: name, message: message });
    })
    .catch(err => {
      console.log(err);
      res.send("error occured");
    });
});

app.get("/api/all-messages", (req, res) => {
  db
    .listMessages()
    .then(docs => {
      console.log("backend_server", docs);
      res.json({ posts: docs });
    })
    .catch(err => {
      console.log(err);
      res.send("error occured");
    });
});

app.get("/api/delete-message", (req, res) => {
  db
    .deleteMessage(req.query.id)
    .then(result => {
      console.log("deleted");
      res.send("message deleted");
    })
    .catch(err => {
      res.send("error occured");
    });
});

app.get("/api/edit-message", (req, res) => {
  console.log(req.query);
  db
    .editMessage(req.query._id, req.query.name, req.query.message)
    .then(result => {
      console.log("edited");
      res.send("message edited");
    })
    .catch(err => {
      res.send("error occured");
    });
});

http.listen(3000, () => console.log("Example app listening on port 3000!"));
