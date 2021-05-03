import React, {Component} from "react";
import "../styles/HoverableImage.css";

export default class HoverableImage extends Component {

    constructor(props) {
        super(props);

        this.caption = props.caption;
        this.handleClick = props.handleClick ? props.handleClick : () => {
        };
    }

    render() {
        return (
            <div data-content={this.caption} className="hoverable-image" onClick={this.handleClick}>
                <img src={`http://localhost:8080/profile/avatar`}
                     alt="Image" className="current-user-image"
                     style={{height: 200, width: 200, objectFit: 'cover'}}/>
            </div>
        );
    }
}