import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './Nav.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    handleClick = (event) => {
        switch (event.target.name) {
            case "dashboard":
                this.props.history.push("/dashboard");
                break;
            case "new":
                this.props.history.push("/new");
                break;
            case "logout":
                this.props.history.push("/");
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
                <button name="logout" onClick={this.handleClick}></button>
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

export default connect(mapStateToProps)(withRouter(Nav));
