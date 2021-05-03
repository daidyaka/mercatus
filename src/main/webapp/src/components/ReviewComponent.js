import React, {Component} from "react";
import i18n from "../services/i18n/i18n";

export default class ReviewComponent extends Component {
    constructor(props) {
        super(props);

        this.review = props.review;
    }

    render() {
        return (
            <>
                <hr/>
                <p>{this.review.userFullName}</p>
                {this.review.mark !== -1 ? <p>{i18n.get('rating.mark')}: <b>{this.review.mark}</b></p> : <></>}
                <p>{this.review.text ? i18n.get('reviews.comment') + ': ' + this.review.text : ''}</p>
            </>
        );
    }

}