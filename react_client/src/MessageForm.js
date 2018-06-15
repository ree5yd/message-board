import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.placeholderName = "name";
    this.placeholderMessage = "message";
    // this.editId = null;
    this.state = { name: "", message: "", editId: null };
    // this.name = "";
    // this.message = "";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    this.props.deleteById(this.state.editId);
  }

  handleSubmit(event) {
    if (this.state.name === "") {
      alert("Name field blank");
      event.preventDefault();
      return;
    }
    if (this.state.message === "") {
      alert("Message field blank");
      event.preventDefault();
      return;
    }
    this.props.action({
      _id: this.props.editId, // this is null if not editing
      name: this.state.name,
      message: this.state.message
    });
    this.props.history.push("/");
    event.preventDefault();
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  static getDerivedStateFromProps(props, currentState) {
    if (props.editId === currentState.editId) {
      return null;
    } else {
      if (props.editId === null) {
        return { name: "", message: "", editId: null };
      } else {
        const post = props.posts.filter(el => {
          return el._id === props.editId;
        })[0];
        return {
          editId: props.editId,
          name: post.name,
          message: post.message
        };
      }
    }
  }

  render() {
    var deleteButton = null;
    if (this.props.editId !== null) {
      deleteButton = (
        <button id="delete" onClick={this.handleDelete}>
          Delete Message
        </button>
      );
    }

    return (
      <div>
        <h3>{this.props.title}</h3>
        {deleteButton}
        <form onSubmit={this.handleSubmit}>
          <input
            key="name"
            value={this.state.name}
            type="text"
            placeholder="name"
            onChange={this.handleNameChange}
          />
          <input
            key="message"
            value={this.state.message}
            type="text"
            placeholder="message"
            onChange={this.handleMessageChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <button>
          <Link to="/">Back</Link>
        </button>
      </div>
    );
  }
}

// class AddMessageForm extends Form {
//     constructor(props){
//         super(props)
//     }
// }

export default withRouter(MessageForm);
