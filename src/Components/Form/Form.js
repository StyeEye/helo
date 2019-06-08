import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            img: "",
            content: ""
        };
    }

    submitPost = () => {
        const body = {
            title: this.state.title,
            img: this.state.img,
            content: this.state.content
        };
        axios.post(`/api/post/${this.props.userid}`, body)
            .then(response => {
                this.props.history.push("/dashboard");
            })
            .catch(err => {
                console.log(err)
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>New Post</h1>
                <h2>Title:</h2>
                <input type="text" palceholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
                <img src="" alt="" />
                <h2>Image URL:</h2>
                <input type="text" placeholder="URL" name="img" value={this.state.img} onChange={this.handleChange} />
                <h2>Content:</h2>
                <input type="text" placeholder="Content" name="content" value={this.state.content} onChange={this.handleChange} />
                <button onClick={this.submitPost}>Post</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userid: state.userid
    }
}

export default connect(mapStateToProps)(Form);
