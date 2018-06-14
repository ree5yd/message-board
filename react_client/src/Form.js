import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);

    var values = {};
    props.headings.forEach(element => {
      values[element] = "";
    });
    console.log(values);

    this.state = {
      headings: props.headings,
      values: values
    };
    console.log(this.state);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const config = {
      params: this.state.values
    };
    const message = {name: }
    this.props.action(message);

  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <form onSubmit={this.handleSubmit}>
          {this.state.headings.map((element, index) => {
            return (
              <input
                key={element}
                value={this.state.values.element}
                type="text"
                placeholder={element}
              />
            );
          })}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

// class AddMessageForm extends Form {
//     constructor(props){
//         super(props)
//     }
// }

export default Form;
