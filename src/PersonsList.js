import React, {Component} from 'react';
import axios from 'axios';

class PersonsList extends Component {
    state ={
        persons:[],
        name:'',
        personId: ''
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then( res => {
                this.setState({persons:res.data});
                console.log(res.data);
            }
                );


    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newName = {
            name: this.state.name
        }
        axios.post('https://jsonplaceholder.typicode.com/users', {newName})
            .then(res => {
                console.log(res);
                console.log(res.data);
                }
            );
        this.setState({name: ''})
    }

    handleChange = event => {
        console.log(event.target.value);
        this.setState({name:event.target.value})
    }

    handleSubmitDelete = event => {
        event.preventDefault();
        axios.delete(`https://jsonplaceholder.typicode.com/users/${this.state.personId}`)
            .then( res => {
                console.log(res);
                console.log(res.data);
            })
    }

    handleChangeDelete = event => {
        this.setState({personId: event.target.value})
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.persons.map(user =><li key={user.id}> {user.username}</li>)}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your name:
                        <input onChange={this.handleChange} value={this.state.name} placeholder='Your name' />
                    </label>
                    <button type='submit' >Add your name</button>
                </form>

                <div>Delete form</div>
                <div>
                    <form onSubmit={this.handleSubmitDelete}>
                        <label>
                            Delete the person via ID
                            <input onChange={this.handleChangeDelete} type='text'/>
                        </label>
                        <button type='submit'>Delete Person</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PersonsList;