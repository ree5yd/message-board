import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.action(id);
  }

  render() {
    if (this.props.show) {
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.props.messages.map((element, index) => {
              var onClick = () => {
                this.handleClick(element._id);
              };
              return (
                <tr id={element._id} key={element._id} onClick={onClick}>
                  <td> {element.name}</td>
                  <td> {element.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }
}

export default Table;
