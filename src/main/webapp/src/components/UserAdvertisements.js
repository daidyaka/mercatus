import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../styles/UserAdvertisements.css';
import {faPenSquare, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Slider from "./Slider";
import Card from "./Card";
import AdType from "./AdType";
import i18n from "../services/i18n/i18n";

export default class UserAdvertisements extends Component {

    constructor() {
        super();
        this.state = {
            ads: []
        }

        this.fetchAds = this.fetchAds.bind(this);
    }

    componentDidMount() {
        this.fetchAds();
    }

    render() {
        return (
            <>
                <hr/>
                <div className="user-ads-block">
                    <h1>{i18n.get('profile.ads')}</h1>
                    <Link to="/profile/create-ad" className="btn btn-green">
                        <FontAwesomeIcon icon={faPlus}/> {i18n.get('profile.ads.create')}
                    </Link>
                </div>
                <hr/>
                <div className="ads">
                    {this.state.ads && this.state.ads.length ?
                        <Slider withScroll={true}>
                            {this.state.ads.map(ad => <Card imageLink={`/media/images/${ad.userId}/${ad.imageUrl}`}
                                                            link={`/ad/${ad.url}`}
                                                            title={ad.title}
                                                            button={{
                                                                icon: faTrash,
                                                                className: "btn red",
                                                                onClick: this.deleteAd.bind(this, ad.url)
                                                            }}>
                                <AdType type={ad.type}/>
                            </Card>)}
                        </Slider>
                        : (
                            <div className="no-ads-container">
                                <FontAwesomeIcon icon={faPenSquare}/>
                                <h3>{i18n.get('profile.ads.no-ads')}</h3>
                            </div>
                        )}
                </div>
            </>
        );
    }

    fetchAds() {
        fetch('/profile/advertisements')
            .then(res => res.json())
            .then(ads => this.setState({ads}))
    }

    deleteAd(adUrl, event) {
        event.preventDefault();
        event.stopPropagation();
        fetch(`/ad/${adUrl}/delete`, {
            method: 'delete'
        }).then(res => res.text()).then(() => location.reload())
    }

}