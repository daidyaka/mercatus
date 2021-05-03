import React, {Component} from "react";
import ReviewComponent from "./ReviewComponent";
import i18n from "../services/i18n/i18n";

export default class AdReviewSection extends Component {

    constructor(props) {
        super(props);

        this.reviews = props.reviews;
    }


    render() {
        return (
            <div>
                <hr/>
                <h3>{i18n.get('reviews.title')}:</h3>
                <div className="ad-review">
                    {this.reviews.length ? this.reviews.map(review => <ReviewComponent review={review}/>) : <p>{i18n.get('reviews.no-reviews')}</p>}
                </div>
            </div>
        );
    }

}