import React, {Component} from "react";
import {withRouter} from "react-router";
import AdComponentHolder from "../components/AdComponentHolder";
import AdReviewSection from "../components/AdReviewSection";
import LeaveReviewComponent from "../components/LeaveReviewComponent";
import AdType from "../components/AdType";
import {Container, Jumbotron, Spinner} from "react-bootstrap";
import {faPhoneAlt, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

        return (
            ad ? (
                <>
                    <Jumbotron fluid style={
                        {
                            background: ad.imageUrl ? `url(/media/images/${ad.userId}/${ad.imageUrl})` : 'lightgray',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }
                    }>
                        <Container>
                            <h1>{ad.title}</h1>
                            <AdType type={ad.type}/>
                            <h3 className="mt-4">Средняя оценка: {ad.rating}<FontAwesomeIcon icon={faStar}/></h3>
                            <a className="btn btn-success" href={`tel:${ad.phoneNumber}`}
                               style={{float: 'right'}}>
                                <FontAwesomeIcon icon={faPhoneAlt}/> Связаться по телефону
                            </a>
                        </Container>
                    </Jumbotron>
                    <hr/>
                    <AdComponentHolder elements={ad.elements} userId={ad.userId}/>
                    <AdReviewSection reviews={ad.reviews}/>
                    <hr/>
                    <LeaveReviewComponent ad={ad}/>
                </>
            ) : (
                <div style={{textAlign: 'center'}}>
                    <Spinner animation="border"/>
                    <p>Загрузка</p>
                </div>
            )
        );
    }
}

export default withRouter(AdPage);