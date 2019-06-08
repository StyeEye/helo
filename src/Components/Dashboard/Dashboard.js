import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import "./Dashboard.css";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            search: "",
            userposts: true
        };
    }

    refreshPosts = () => {
        axios.get(`/api/posts?search=${encodeURIComponent(this.state.search)}&userposts=${this.state.userposts}`)
            .then(response => {
                console.log(response)
                this.setState({
                    posts: response.data
                });
            });
    }

    componentDidMount() {
        this.refreshPosts();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.value, event.target.name)
    }

    toggleUserposts = () => {
        this.setState({
            userposts: !this.state.userposts
        });
    }

    resetSearch = () => {
        this.setState({
            search: "",
            userposts: true
        }, this.refreshPosts);
    }

    render() {
        const posts = this.state.posts.map((e, i) => {
            return (
                <div className="post-preview center-box" key={i}>
                    <Link to={`/post/${e.postid}`} className="post-link">
                        <h2>{e.title}</h2>
                        <div className="preview-profile">
                            <p>by {e.author}</p>
                            <div style={{ backgroundImage: `url(${e.authorPic})` }}></div>
                        </div>
                    </Link>
                </div>);
        })
        console.log(this.state.posts)

        return (
            <div className="dashboard">
                <div className="search-bar center-box">
                    <div className="search-box">
                        <input type="text" name="search" placeholder="Search" value={this.state.search} onChange={this.handleChange} />
                        <button className="search-button" onClick={this.refreshPosts}></button>
                        <button className="reset-button" onClick={this.resetSearch}>Reset</button>
                    </div>
                    <div className="search-right">
                        <label className="myposts-space" htmlFor="userposts">My Posts</label>
                        <input className="myposts-space" type="checkbox" name="userposts" id="userposts" checked={this.state.userposts} onChange={this.toggleUserposts} />
                    </div>
                </div>
                <div className="posts center-box">
                    {posts}
                </div>
            </div>
        )
    }
}

export default Dashboard;