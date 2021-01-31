import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationContext from "../providers/AuthenticationContext";

class HeaderAuth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        }
    }

    render() {
        return (
            <AuthenticationContext.Consumer>
                {value => {
                    return (value.auth.isAuthenticated ? (
                        <div className="header-auth">
                            <Link to="/profile">Профиль</Link>
                            <span className="vertical-delimiter">/</span>
                            <a href="http://localhost:8080/logout">Выйти</a>
                        </div>
                    ) : (
                        <div className="header-auth">
                            <Link to="/login">Войти</Link>
                            <span className="vertical-delimiter">/</span>
                            <Link to="/registration">Зарегистрироваться</Link>
                        </div>
                    ))
                }}
            </AuthenticationContext.Consumer>
        );
    }
}

HeaderAuth.contextType = AuthenticationContext;

export default HeaderAuth;