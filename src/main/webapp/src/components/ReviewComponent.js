import React, {Component} from "react";

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
                {this.review.mark !== -1 ? <p>Оценка: <b>{this.review.mark}</b></p> : <></>}
                <p>{this.review.text ? 'Комментарий: ' + this.review.text : ''}</p>
            </>
        );
    }

}