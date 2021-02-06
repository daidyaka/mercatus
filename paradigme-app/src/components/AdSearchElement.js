import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationContext from "../providers/AuthenticationContext";

export default class AdSearchElement extends Component {

    constructor(props) {
        super(props);

        this.ad = props.ad;
    }


    render() {
        return (
            <div>
                <img src={`/media/images/${this.context.auth?.user.id}/${this.ad.imageUrl}`} alt="Объявление"/>
                <Link to={`/ad/${this.ad.url}`}>{this.ad.title}</Link>
            </div>
        );
    }
}

AdSearchElement.contextType = AuthenticationContext;