import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="table-fill">
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.props.messages.map((element, index) => {
              var onClick = () => {
                this.props.history.push("/edit-message/" + element._id);
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
        <div className="button-container">
          <Link to="/add-message">
            <button className="button">Add Message</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Table);
