import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

class CreateExercises extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {// check if there's at least one user 
                    this.setState({
                        users: response.data.map(user => user.username), // return username from array in mongodb
                        username: response.data[0].username          
                    })
                }
            })
            .catch(error => console.log(error))
    }

    // Set new username from dropdown
    onChangeUsername(e) {
        this.setState({
            username: e.target.value // update user element within state
        })
    }

    // Set new description from dropdown
    onChangeDescription(e) {
        this.setState({
            description: e.target.value // update description element within state
        })
    }

    // Set new duration from dropdown
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value // update user element within state
        })
    }

    // Set new date from dropdown
    onChangeDate(date) {
        this.setState({
           date: date  // update date element within state
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))

        // once exercise is submitted, go back to list of exercises
        window.location = "/" 
    }

    render() {
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={ this.state.username }
                            onChange={ this.onChangeUsername }>
                            {
                                this.state.users.map((user) => {
                                    return (
                                        <option key={user} value={user}>{ user }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={ this.state.description }
                            onChange={ this.onChangeDescription }
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration: (in minutes)</label>
                        <input type="text"
                            className="form-control"
                            value={ this.state.duration }
                            onChange={ this.onChangeDuration }
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                            selected={ this.state.date }
                            onChange={ this.onChangeDate }
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateExercises