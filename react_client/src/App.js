import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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
      errorMessage: null
    };
    this.getMessages();
    this.addMessage = this.addMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  render() {
    return (
      <div className="App">
        {this.state.title}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Table
                messages={this.state.messages}
                action={this.switchToEditMessage}
                navigate={null}
              />
            )}
          />
          <Route
            path="/add-message"
            render={() => (
              <MessageForm
                title="Add Message"
                action={this.addMessage}
                editId={null}
              />
            )}
          />
          <Route
            path="/edit-message/:id"
            render={props => (
              <MessageForm
                title="Edit Message"
                action={this.editMessage}
                deleteById={this.deleteMessage}
                editId={props.match.params.id}
                posts={this.state.messages}
              />
            )}
          />
        </Switch>
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
        this.setState(
          { messages: [...this.state.messages, response.data] },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
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
        this.setState(
          {
            messages: new_msg_state,
            currentView: "table-view"
          },
          () => {
            this.props.history.push("/");
          }
        );
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
        const msg_index = this.state.messages.findIndex(el => {
          return el._id === id;
        });
        let new_msg_state = this.state.messages;
        new_msg_state.splice(msg_index, 1);
        this.setState({ messages: new_msg_state }, () =>
          this.props.history.push("/")
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default withRouter(App);
