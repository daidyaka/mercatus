import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../styles/Card.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
            <Link to={this.link} className="card-pm">
                {this.imageLink ? <img src={this.imageLink} alt="Картинка"/> : <></>}
                <div className="card-title">
                    <h1 style={{
                        textOverflow: 'ellipsis',
                        maxWidth: 150,
                        overflow: 'hidden'
                    }}>{this.title}</h1>
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