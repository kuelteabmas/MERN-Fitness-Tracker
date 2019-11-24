import React, { Component } from "react";
import axios from 'axios'

class CreateUsers extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ""
    };
  }

  // Set new username from dropdown
  onChangeUsername(e) {
    this.setState({
      username: e.target.value // update user element within state
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log(user);

    // Send data (object: user) to backend
    axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))

    // Keep the user on the user page to create other users
    this.setState({
      username: ""
    });
  }

  render() {
    return (
      <div>
        <h3> Create New Exercise Log </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUsers;