let postString = "";

const showMessages = posts => {
  const postsEl = document.querySelector("#posts");

  posts.forEach(function(post) {
    postString +=
      "<tr><td>" + post.name + "</td><td>" + post.message + "</td></tr>";
  });

  postsEl.innerHTML = postString;
};

const getAndShowMessages = () => {
  axios
    .get("/api/all-messages")
    .then(function(response) {
      console.log(response);
      showMessages(response.data.posts);
    })
    .catch(function(error) {
      console.log(error);
    });
};

// axios
//   .get("/api/all-messages")
//   .then(function(response) {
//     console.log(response);
//     showMessages(response.data.posts);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
getAndShowMessages();
var socket = io();
console.log("my script");
socket.on("new message", post => {
  const postsEl = document.querySelector("#posts");
  postString +=
    "<tr><td>" + post.name + "</td><td>" + post.message + "</td></tr>";
  postsEl.innerHTML = postString;
});

const postButtonEl = document.querySelector("#post-button");
postButtonEl.addEventListener("click", () => {
  post = getFormData();
  postMessage(post.name, post.message);
});

const deleteButtonEl = document.querySelector("#delete-button");
deleteButtonEl.addEventListener("click", () => {
  post = getDeleteFormData();
  deleteMessage(post.name);
  getAndShowMessages();
});

const postMessage = (name, message) => {
  const config = {
    params: {
      name: name,
      message: message
    }
  };
  axios
    .get("/api/new-message", config)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const deleteMessage = name => {
  const config = {
    params: {
      name: name
    }
  };
  axios
    .get("/api/delete-message", config)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const getFormData = () => {
  const nameEl = document.querySelector("#name");
  const messageEl = document.querySelector("#message");
  const name = nameEl.value;
  const message = messageEl.value;
  console.log(name);
  return { name: name, message: message };
};

const getDeleteFormData = () => {
  const nameEl = document.querySelector("#delete-name");
  const name = nameEl.value;
  return { name: name };
};
