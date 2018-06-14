import React, { Component } from "react";

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

    // var posts = this.props.posts;
    // if (this.state.editId !== null) {
    //   posts[this.editId] = {
    //     _id: this.state.editId,
    //     name: this.state.name,
    //     message: this.state.message
    //   };
    // }
    // console.log(posts);

    this.props.action({
      _id: this.props.editId, // this is null if not editing
      name: this.state.name,
      message: this.state.message
    });
    event.preventDefault();
  }

  handleNameChange(event) {
    // alert("A name was submitted: " + this.state.value);
    this.setState({ name: event.target.value });
  }

  handleMessageChange(event) {
    // alert("A name was submitted: " + this.state.value);
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
    // if (this.props.editId !== null) {
    //   const post = this.props.posts.filter(el => {
    //     return el._id === this.props.editId;
    //   })[0];
    //   this.editId = this.props.posts.indexOf(post);
    //   this.placeholderName = post.name;
    //   this.placeholderMessage = post.message;
    // }

    if (this.props.show) {
      return (
        <div>
          <h3>{this.props.title}</h3>
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
          <div>
            <button type="button"> Back </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

// class AddMessageForm extends Form {
//     constructor(props){
//         super(props)
//     }
// }

export default MessageForm;
