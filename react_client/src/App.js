import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Table from "./Table";
import MessageForm from "./MessageForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { _id: "no_id", name: "blank_name", message: "blank_message" }
      ],
      title: "hello",
      currentView: "table-view",
      editId: null,
      errorMessage: null
    };
    this.getMessages();

    this.changeView = this.changeView.bind(this);
    this.changeToTableView = this.changeToTableView.bind(this);
    this.changeToNewMessageView = this.changeToNewMessageView.bind(this);
    this.changeToEditMessageView = this.changeToEditMessageView.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
  }

  changeView(newView) {
    this.setState({ currentView: newView });
  }

  changeToTableView() {
    this.changeView("table-view");
  }

  changeToNewMessageView() {
    this.changeView("new-message-view");
  }

  changeToEditMessageView(id) {
    this.setState({
      currentView: "edit-message-view",
      editId: id
    });
  }

  render() {
    let showTable = this.state.currentView === "table-view";
    let showMessage = this.state.currentView === "new-message-view";
    let editMessage = this.state.currentView === "edit-message-view";
    let button = null;
    if (showTable) {
      button = (
        <input
          type="button"
          value="new message"
          onClick={this.changeToNewMessageView}
        />
      );
    } else if (showMessage) {
      button = (
        <input type="button" value="table" onClick={this.changeToTableView} />
      );
    }
    return (
      <div className="App">
        {this.state.title}
        <div>
          {button}
          {/* <input type="button" value="table" onClick={this.changeToTableView} />
          <input
            type="button"
            value="new message"
            onClick={this.changeToNewMessageView}
          /> */}
        </div>
        <Table
          messages={this.state.messages}
          show={showTable}
          action={this.changeToEditMessageView}
        />
        <MessageForm
          title="Add Message"
          action={this.addMessage}
          show={showMessage}
          editId={null}
        />
        <MessageForm
          title="Edit Message"
          action={this.editMessage}
          show={editMessage}
          editId={this.state.editId}
          posts={this.state.messages}
        />
        <div>{this.state.errorMessage}</div>
      </div>
    );
  }

  addMessage(post) {
    const config = {
      params: {
        name: post.name,
        message: post.message
      }
    };
    axios
      .get("/api/new-message", config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ messages: [...this.state.messages, post] });
  }

  getMessages() {
    axios
      .get("/api/all-messages")
      .then(response => {
        console.log(response);
        this.setState({
          messages: response.data.posts,
          title: "Message Board"
        });
      })
      .catch(error => {
        console.log(error);
        var errorMessage =
          error.message + " could not retrieve table from database";
        this.setState({ errorMessage: errorMessage });
      });
  }

  editMessage(post) {
    const config = {
      params: {
        _id: post._id,
        name: post.name,
        message: post.message
      }
    };
    axios
      .get("/api/edit-message", config)
      .then(res => {
        console.log(res);
        const msg_index = this.state.messages.findIndex(el => {
          return el._id === post._id;
        });
        let new_msg_state = this.state.messages;
        new_msg_state[msg_index] = {
          _id: post._id,
          name: post.name,
          message: post.message
        };
        this.setState({
          messages: new_msg_state,
          currentView: "table-view",
          editId: null
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMessage: error.message });
      });
  }

  deleteMessage(id) {
    const config = {
      params: {
        id: id
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
  }
}

export default App;
