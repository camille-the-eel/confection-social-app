import React, { Component }  from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Nav/Nav";
import CommentSidebar from '../CommentSidebar/CommentSidebar';
import HomeSidebar from '../HomeSidebar/HomeSidebar';
import PostFull from '../../components/PostFull/PostFull';
import CurrentUser from "../../AppContext";
import Create from '../../components/Create/Create';

import API from "../../utils/API";

import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css/dist/js/materialize.min.js';
import './style.css';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            postForComments: {},
            commentsHidden: true,
            menuHidden: false,
            createHidden: true,
            feedHidden: false
        }

    }

    componentDidMount() {
        console.log(this);
        this.loadPosts()
    }

    // Loads all posts (will eventually call posts for followed pages)
    loadPosts = () => {
        let user_id = {
            _id: sessionStorage.user_id
        }
        API.getPosts(user_id)
            .then(res => {    
                this.setState({
                    posts: res.data
                });
            })
            .catch(err => console.log(err));
    }

    // Fires when open comments button is clicked. Calls load comments button and passes through the post id of the comments button that was clicked
    openComments = async (postId) => {
        
        // Constant to have filled with data from database
        const postForComments = await 
            API.getComments(postId)
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err));

        // Update state based off of the returned post comments and then open comments and close sidebar
        this.setState({
            postForComments: postForComments,
            commentsHidden: false,
            sidebarHidden: true
        })
    }

    closeComments = () => {
        this.setState({
            commentsHidden: true,
            menuHidden: false
        })
    }

    toggleCreate = () => {
        this.loadPosts()
        this.setState({
            createHidden: !this.state.createHidden
        })
    }

    render() {
        if (!this.context.isUser) {
            return <Redirect to={{ pathname: "/" }} />
        } else {
            return (
                <div className="body">
                    <Navbar/>
                    {!this.state.menuHidden && <HomeSidebar toggleCreate={this.toggleCreate}/>}
                    {!this.state.commentsHidden && <CommentSidebar refreshComments={this.openComments} closeComments={this.closeComments}>{this.state.postForComments}</CommentSidebar>}
                    {!this.state.createHidden && <Create toggleCreate={this.toggleCreate}/>}
                    {!this.state.posts ? 
                        <div className="postMargin">
                            <h2>There are no posts to display. Follow someone to see their posts here</h2>
                        </div>
                        :
                        <div className="postMargin">
                            {this.state.posts.map(post => (
                                <PostFull key={post._id} openComments={this.openComments}>
                                    {post}
                                </PostFull>
                            ))}
                        </div>

                    }
                </div>
            )
        }
    }
}

Home.contextType = CurrentUser;
export default Home;