import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../styles/Card.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.imageLink = props.imageLink;
        this.link = props.link;
        this.title = props.title;
        this.button = props.button;
    }

    render() {
        return (
            <Link to={this.link} className="card">
                {this.imageLink ? <img src={this.imageLink} alt="Картинка"/> : <></>}
                <div className="card-title">
                    <h1>{this.title}</h1>
                    {this.button ? <button className={this.button.className} onClick={this.button.onClick}>
                        <FontAwesomeIcon icon={this.button.icon}/>
                    </button> : <></>}
                </div>
                <hr/>
                <div className="card-container">
                    {this.props.children}
                </div>
            </Link>
        );
    }

    static Footer = class Footer extends Component {
        render() {
            return <div className="card-footer">{this.props.children}</div>
        }
    }

}