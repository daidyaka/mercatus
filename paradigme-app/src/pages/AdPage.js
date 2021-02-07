import React, {Component} from "react";
import {withRouter} from "react-router";
import AdComponentHolder from "../components/AdComponentHolder";
import AdReviewSection from "../components/AdReviewSection";
import LeaveReviewComponent from "../components/LeaveReviewComponent";
import AdType from "../components/AdType";

class AdPage extends Component {

    constructor(props) {
        super(props);

        this.title = props.match.params.title;
        this.state = {}
    }

    componentDidMount() {
        fetch(`/ad/${this.title}`).then(response => {
            if (response.status === 200) {
                response.json()
                    .then(loadedAd => {
                        this.setState(loadedAd);
                    })
            } else {
                location.href = '/404';
            }
        })
    }

    render() {
        let ad = this.state.ad;
        let averageReviewMark = this.state.averageReviewMark;

        return (
            ad ? (
                <>
                    <h1>{ad.title}</h1>
                    <h2>Средняя оценка: {averageReviewMark}</h2>
                    <AdType type={ad.type}/>
                    <b>{ad.phoneNumber}</b>
                    <hr/>
                    <AdComponentHolder elements={ad.elements} userId={ad.userId}/>
                    <AdReviewSection reviews={ad.reviews}/>
                    <hr/>
                    <LeaveReviewComponent ad={ad}/>
                </>
            ) : (
                <p>
                    Loading...
                </p>
            )
        );
    }
}

export default withRouter(AdPage);