import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../styles/Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.imageLink = props.imageLink;
        this.link = props.link;
        this.title = props.title;
    }

    render() {
        return (
            <Link to={this.link} className="card">
                {this.imageLink ? <img src={this.imageLink} alt="Картинка"/> : <></>}
                <h1>{this.title}</h1>
                <hr/>
                {this.props.children}
            </Link>
        );
    }

}