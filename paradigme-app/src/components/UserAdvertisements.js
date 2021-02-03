import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../styles/UserAdvertisements.css';
import {faPlus, faPenSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class UserAdvertisements extends Component {

    constructor() {
        super();
        this.state = {
            ads: []
        }
    }

    componentDidMount() {
        fetch('/profile/advertisements')
            .then(res => res.json())
            .then(ads => this.setState({ads}))
    }

    render() {
        return (
            <>
                <hr/>
                <div className="user-ads-block">
                    <h1>Мои объявления</h1>
                    <Link to="/profile/create-ad" className="btn btn-green">
                        <FontAwesomeIcon icon={faPlus}/> Создать новое объявление
                    </Link>
                </div>
                <hr/>
                <ul className="ads">
                    {this.state.ads && this.state.ads.length ? this.state.ads.map(ad => {
                        return (
                            <li key={ad.url}>
                                <Link to={`/ad/${ad.url}`}>{ad.title}</Link>
                            </li>
                        )
                    }) : (
                        <div className="no-ads-container">
                            <FontAwesomeIcon icon={faPenSquare}/>
                            <h3>Пока нет ваших объявлений, но вы можете создать новое.</h3>
                        </div>
                    )}
                </ul>
            </>
        );
    }
}