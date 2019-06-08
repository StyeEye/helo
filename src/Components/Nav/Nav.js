import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { updateUser, resetBuilder } from '../../ducks/reducer'

import './Nav.css';
import axios from 'axios';


class Nav extends Component {
    constructor(props) {
        super(props);
    }

    getUser = () => {
        axios.get("/api/auth/me")
            .then(response => {
                console.log("response:", response.data);
                this.props.updateUser(response.data.username, response.data.profile);
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getUser();
    }

    logout = () => {
        axios.post("/api/auth/logout")
            .then(response => {
                //console.log(response)
                this.props.resetBuilder();
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleClick = (event) => {
        switch (event.target.name) {
            case "dashboard":
                this.props.history.push("/dashboard");
                break;
            case "new":
                this.props.history.push("/new");
                break;
            default:
                break;
        }
    }

    render() {
        if (this.props.location.pathname === "/")
            return null;

        return (
            <div className="nav-bar">
                <img src={this.props.profile} alt="Missing icon" />
                <h1>{this.props.username}</h1>
                <button name="dashboard" onClick={this.handleClick}></button>
                <button name="new" onClick={this.handleClick}></button>
                <button name="logout" onClick={this.logout}></button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        profile: state.profile
    }
}

export default connect(mapStateToProps, { updateUser, resetBuilder })(withRouter(Nav));
