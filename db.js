const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");

const adapter = new FileSync("/tmp/db.json");
const db = low(adapter);

db.defaults({ posts: [] }).write();

const addMessage = (name, message) => {
  db
    .get("posts")
    .push({ id: shortid.generate(), name: name, message: message })
    .write();
};

const listMessages = () => {
  const posts = db.get("posts").value();
  console.log(posts);
  return posts;
};

module.exports = { addMessage: addMessage, listMessages: listMessages };
