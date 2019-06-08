import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../ducks/reducer';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.login = this.login.bind(this);

        console.log("Auth props:", props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        console.log(event.target.name, event.target.value)
    }

    register = () => {
        const body = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post("/api/auth/register", body)
            .then(response => {
                const { username, userid, profile } = response.data;
                //console.log(username, userid, profile, response);

                this.props.updateUser(userid, username, profile);

                this.props.history.push("/dashboard");
            }).catch(err => {
                console.log(err)
            })
    }

    // Non-arrow method used for the sake of using .bind at least once
    login() {
        const body = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post("/api/auth/login", body)
            .then(response => {
                const { username, userid, profile } = response.data;
                this.props.updateUser(userid, username, profile);

                this.props.history.push("/dashboard");
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange} name="username" />
                <input type="text" placeholder="Password" value={this.state.password} onChange={this.handleChange} name="password" />
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

export default connect(null, { updateUser })(Auth);