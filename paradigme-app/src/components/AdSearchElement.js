import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationContext from "../providers/AuthenticationContext";
import {Image} from "react-bootstrap";

export default class AdSearchElement extends Component {

    constructor(props) {
        super(props);

        this.ad = props.ad;
    }


    render() {
        return (
            <div>
                <Link to={`/ad/${this.ad.url}`}>
                    <Image src={`/media/images/${this.ad.userId}/${this.ad.imageUrl}`} alt="Объявление" rounded/>
                    <span>{this.ad.title}</span>
                </Link>
            </div>
        );
    }
}

AdSearchElement.contextType = AuthenticationContext;