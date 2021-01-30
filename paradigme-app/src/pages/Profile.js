import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationContext from "../providers/AuthenticationContext";

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            ads: []
        }
    }


    componentDidMount() {
        fetch('/profile/advertisements')
            .then(res => res.json())
            .then(ads => console.log(ads))
    }

    render() {
        return (
            <AuthenticationContext.Consumer>
                {value => {
                    return (
                        <>
                            <h1>{this.context.auth.user?.firstName} {this.context.auth.user?.lastName}</h1>
                            {/*<img src={`/profile/avatar?userId=${this.state.userId}`} alt="Фото пользователя"*/}
                            {/*     className="current-user-image" height="200" width="200"/>*/}
                            <h1>Мои объявления</h1>
                            <ul className="ads">
                                {this.state.ads.map(ad => <li><Link to={`/ad/${ad.url}`}>{ad.title}</Link></li>)}
                            </ul>
                            <hr/>
                            <a href="/profile/create-ad">Создать новое объявление</a>
                        </>)
                }}
            </AuthenticationContext.Consumer>
        );
    }
}

Profile.contextType = AuthenticationContext;

export default Profile;