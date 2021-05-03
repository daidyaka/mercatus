import React, {Component} from "react";
import AuthenticationContext from "../providers/AuthenticationContext";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import i18n from "../services/i18n/i18n";

export default class AdSearchElement extends Component {

    constructor(props) {
        super(props);

        this.ad = props.ad;
    }


    render() {
        return (
            <Card>
                <Card.Img variant="top" src={`/media/images/${this.ad.userId}/${this.ad.imageUrl}`}/>
                <Card.Body>
                    <Card.Title>
                        <Link to={`/ad/${this.ad.url}`}>
                            {this.ad.title}
                        </Link>
                    </Card.Title>
                    <Card.Text style={{textAlign: 'right'}}>
                        {i18n.get('rating')}: {this.ad.rating} <FontAwesomeIcon icon={faStar}/>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        {i18n.get('ad.created.time.label')} {this.timeSince(new Date(this.ad.dateCreated))} {i18n.get('ad.created.time.ago')}
                    </small>
                </Card.Footer>
            </Card>
        );
    }

    timeSince = (date) => {

        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + i18n.get('ad.created.time.ago.years');
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + i18n.get('ad.created.time.ago.months');
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + i18n.get('ad.created.time.ago.days');
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + i18n.get('ad.created.time.ago.hours');
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + i18n.get('ad.created.time.ago.minutes');
        }
        return Math.floor(seconds) + i18n.get('ad.created.time.ago.second');
    }
}

AdSearchElement.contextType = AuthenticationContext;