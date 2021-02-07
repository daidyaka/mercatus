import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../styles/UserAdvertisements.css';
import {faPenSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HorizontalSlider from "./HorizontalSlider";
import Card from "./Card";
import AdType from "./AdType";

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
                <div className="ads">
                    {this.state.ads && this.state.ads.length ?
                        <HorizontalSlider numberOfElements={4}>
                            {this.state.ads.map(ad => <Card imageLink={ad.imageUrl}
                                                            link={`/ad/${ad.url}`}
                                                            title={ad.title}>
                                <AdType type={ad.type}/>
                            </Card>)}
                        </HorizontalSlider>
                        : (
                            <div className="no-ads-container">
                                <FontAwesomeIcon icon={faPenSquare}/>
                                <h3>Пока нет ваших объявлений, но вы можете создать новое.</h3>
                            </div>
                        )}
                </div>
            </>
        );
    }

}