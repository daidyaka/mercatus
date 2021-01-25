import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class HeaderAuth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        }
    }


    componentDidMount() {
        let jwtToken = localStorage.getItem('jwt');
        let headers = {};
        if (jwtToken) {
            headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        fetch('/profile/get', {
            headers: new Headers(headers)
        })
            .then(response => response.json())
            .then((auth) => {
                this.setState({
                    isAuthenticated: auth.isAuthenticated
                })
            });
    }

    render() {
        return (this.state.isAuthenticated ? (
            <div className="header-auth">
                <Link to="/profile">Профиль</Link>
                <span className="vertical-delimiter">/</span>
                <Link to="/logout">Выйти</Link>
            </div>
        ) : (
            <div className="header-auth">
                <Link to="/login">Войти</Link>
                <span className="vertical-delimiter">/</span>
                <Link to="/registration">Зарегистрироваться</Link>
            </div>
        ));
    }
}