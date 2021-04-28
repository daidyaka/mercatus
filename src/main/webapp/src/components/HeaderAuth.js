import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthenticationContext from "../providers/AuthenticationContext";
import VerticalDelimiter from "./VerticalDelimiter";
import i18n from "../services/i18n/i18n";
import {Image} from "react-bootstrap";

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
                            <Link to="/profile">
                                <Image className="mr-2" height={30} roundedCircle
                                       src={`/media/images/${value.auth.user.id}/${value.auth.user.imageUrl}`}/>
                                {i18n.get('profile')}
                            </Link>
                            <VerticalDelimiter/>
                            <a href="http://localhost:8080/logout">{i18n.get('logout')}</a>
                        </div>
                    ) : (
                        <div className="header-auth">
                            <Link to="/login">{i18n.get('login')}</Link>
                            <VerticalDelimiter/>
                            <Link to="/registration">{i18n.get('register')}</Link>
                        </div>
                    ))
                }}
            </AuthenticationContext.Consumer>
        );
    }
}

HeaderAuth.contextType = AuthenticationContext;

export default HeaderAuth;