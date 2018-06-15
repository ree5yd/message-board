const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const assert = require("assert");

require("dotenv").config();

// Connection URL
const url = process.env.MONGODB_URL;

// Database Name
const dbName = process.env.MONGODB_NAME;

let db;

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");

  db = client.db(dbName);
});

const addMessage = (name, message) => {
  const collection = db.collection("message_board");

  return collection.insertOne({ name: name, message: message }).then(result => {
    return result;
  });
};

const listMessages = () => {
  const collection = db.collection("message_board");

  return collection.find({}).toArray();
};

const deleteMessage = id => {
  const collection = db.collection("message_board");
  let objectId = new mongo.ObjectID(id);
  console.log(objectId);
  return collection.deleteOne({ _id: objectId }).then(result => {
    return result;
  });
};

const editMessage = (id, name, message) => {
  const collection = db.collection("message_board");
  console.log(id);
  let objectId = new mongo.ObjectID(id);
  return collection
    .updateOne({ _id: objectId }, { $set: { name: name, message: message } })
    .then(result => {
      return result;
    });
};

module.exports = {
  addMessage: addMessage,
  listMessages: listMessages,
  deleteMessage: deleteMessage,
  editMessage: editMessage
};
