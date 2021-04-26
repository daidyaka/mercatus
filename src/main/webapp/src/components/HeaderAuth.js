import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationContext from "../providers/AuthenticationContext";
import VerticalDelimiter from "./VerticalDelimiter";

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
                            <VerticalDelimiter/>
                            <a href="http://localhost:8080/logout">Выйти</a>
                        </div>
                    ) : (
                        <div className="header-auth">
                            <Link to="/login">Войти</Link>
                            <VerticalDelimiter/>
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