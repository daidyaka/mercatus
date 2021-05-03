import React, {Component} from "react";
import {withRouter} from "react-router";
import AdComponentHolder from "../components/AdComponentHolder";
import AdReviewSection from "../components/AdReviewSection";
import LeaveReviewComponent from "../components/LeaveReviewComponent";
import AdType from "../components/AdType";
import {Container, Image, Jumbotron, Spinner} from "react-bootstrap";
import {faLocationArrow, faMapMarkedAlt, faPhoneAlt, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import i18n from "../services/i18n/i18n";

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
                        document.title = loadedAd.ad.title;
                        this.setState(loadedAd);
                    })
            } else {
                location.href = '/404';
            }
        })
    }

    render() {
        let ad = this.state.ad;
        let author = this.state.author;

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
                        <Container style={{
                            boxShadow: '0 0 100px rgb(0 0 0 / 50%)',
                            background: 'rgb(0 0 0 / 45%)',
                            color: 'white',
                            paddingBottom: 5,
                            paddingTop: 5
                        }}>
                            <h6 style={{textAlign: 'right'}}>
                                Автор: {author.firstName} {author.lastName}
                                <Image className="ml-2" height={30} roundedCircle
                                       src={`/media/images/${author.id}/${author.imageUrl}`}/>
                            </h6>
                            <h1>{ad.title}</h1>
                            <AdType type={ad.type}/>
                            <p className={"mt-2"}><FontAwesomeIcon icon={faMapMarkedAlt}/> {author.city}</p>
                            <h3 className="mt-4">{i18n.get('average-mark')}: {ad.rating}<FontAwesomeIcon icon={faStar}/></h3>
                            <a className="btn btn-success" href={`tel:${ad.phoneNumber}`}
                               style={{
                                   float: 'right',
                                   position: 'relative',
                                   bottom: 50
                               }}>
                                <FontAwesomeIcon icon={faPhoneAlt}/> {i18n.get('make-call')}
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
                    <p>{i18n.get('loading')}</p>
                </div>
            )
        );
    }
}

export default withRouter(AdPage);