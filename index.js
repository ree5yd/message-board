const express = require("express");
const app = express();
// const http = require("http").Server(app);
// const io = require("socket.io")(http);
const db = require("./mongodb.js");

app.use("/", express.static("public"));

app.get("/api/new-message", (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const message = req.query.message;
  db
    .addMessage(name, message)
    .then(result => {
      console.log("inserted");
      res.send("query added");
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
    .deleteMessage(req.query.name)
    .then(result => {
      console.log("deleted");
      res.send("message deleted");
    })
    .catch(err => {
      res.send("error occured");
    });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
