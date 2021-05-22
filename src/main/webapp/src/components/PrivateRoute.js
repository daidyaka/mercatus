import React, {Component} from "react";
import {Route} from "react-router-dom";
import {Redirect} from "react-router";
import AuthenticationContext from "../providers/AuthenticationContext";

export default class PrivateRoute extends Component {

    constructor(props) {
        super(props);

        this.auth = props.auth;
    }


    render() {
        return <Route
            render={(props) => this.getPage(props)}
        />;
    }

    getPage = (props) => {
        if (this.auth.isAuthenticated) {
            return <this.props.component/>;
        }
        return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
    }
}

PrivateRoute.contextType = AuthenticationContext