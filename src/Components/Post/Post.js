import React, { Component } from 'react'
import axios from 'axios';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            img: "",
            content: "",
            author: "",
            authorPic: ""
        };
    }

    fetchPost = () => {
        axios.get(`/api/post/${this.props.match.params.postid}`)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    img: response.data.img,
                    content: response.data.content,
                    author: response.data.author,
                    authorPic: response.data.authorPic
                });
            })
    }

    componentDidMount() {
        this.fetchPost();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.postid !== this.props.match.params.postid)
            this.fetchPost();
    }

    render() {
        return (
            <div>
                <title>{this.state.title}</title>
                <img src={this.state.img} alt=""/>
                <p>{this.state.content}</p>
                <h2>{this.state.author}</h2>
                <img src={this.state.authorPic} alt=""/>
            </div>
        )
    }
}

export default Post;