import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>
          delete
        </a>
      </td>
    </tr>
)

class ExercisesList extends React.Component {
    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        // get list of exercises from db
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch(error => console.log(error))
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
            
        this.setState({
            // filter and go through the array. if the id is not equal to the current id then return it to the exercises state
            exercises: this.state.exercises.filter(element => element._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise 
                    exercise={ currentExercise } 
                    deleteExercise={ this.deleteExercise}
                    key={ currentExercise._id } />
        })
    }

    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList