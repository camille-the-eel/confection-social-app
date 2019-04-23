import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css';

class Create extends Component {

    componentDidMount() {
        var x = document.createElement("input");
        x.setAttribute("type", "file");
        x.setAttribute("id", "chooseFile");
        document.getElementById("upload").appendChild(x);
    }

    render () {
        return (
            <div id="divBody">
                <div className="photoDiv">
                    <p id="photoHead">photo</p>
                    <div id="upload">
                    </div>
                </div>
                <div className="text-input">
                    <p id="captionHead">caption</p>
                    <textarea className="commentInput"/>
                </div>
                <div className="input-field">
                    <p id="creditHead">credit</p>
                    <input id="credit" type="text" className="validate addition"/>
                </div>
                <div className="input-field">
                    <p id="tagsHead">tags</p>
                    <input id="tags" type="text" className="validate addition"/>
                </div>
                <button className="postButton">post</button>
            </div>
        )
    }
}

export default Create;