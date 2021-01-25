import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            fullUserName: '',
            ads: []
        }
    }


    componentDidMount() {
        fetch('/profile/advertisements', {
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            })
        }).then(res => res.json())
            .then(ads => console.log(ads))
    }

    render() {
        return (
            <>
                <h1>{this.state.fullUserName}</h1>
                {/*<img src={`/profile/avatar?userId=${this.state.userId}`} alt="Фото пользователя"*/}
                {/*     className="current-user-image" height="200" width="200"/>*/}
                <h1>Мои объявления</h1>
                <ul className="ads">
                    {this.state.ads.map(ad => <li><Link to={`/ad/${ad.url}`}>{ad.title}</Link></li>)}
                </ul>
                <hr/>
                <a href="/profile/create-ad.html">Создать новое объявление</a>
            </>
        );
    }
};