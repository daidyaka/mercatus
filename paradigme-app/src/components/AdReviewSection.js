import React, {Component} from "react";
import ReviewComponent from "./ReviewComponent";

export default class AdReviewSection extends Component {

    constructor(props) {
        super(props);

        this.reviews = props.reviews;
    }


    render() {
        return (
            <div>
                <h3>Отзывы:</h3>
                <div className="ad-review">
                    {this.reviews.map(review => <ReviewComponent review={review}/>) }
                </div>
            </div>
        );
    }

}