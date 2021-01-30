import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import CreateAd from "./pages/CreateAd";
import AuthenticationContext from "./providers/AuthenticationContext";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            auth: {
                isAuthenticated: false,
                user: undefined
            }
        };
    }

    componentDidMount() {
        fetch('/profile/get')
            .then(response => response.json())
            .then((auth) => {
                this.setState({
                    auth: {
                        isAuthenticated: auth.isAuthenticated,
                        user: auth.user
                    }
                });
            });
    }

    render() {
        return (
            <AuthenticationContext.Provider value={this.state}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route path={'/profile/create-ad'}><CreateAd/></Route>
                        <Route path={'/profile'}><Profile/></Route>
                        <Route path={'/registration'}><Registration/></Route>
                        <Route path={'/login'}><Login/></Route>
                        <Route exact path={'/'}><Home/></Route>
                        <Route path={'*'}><NotFound/></Route>
                    </Switch>
                </Router>
            </AuthenticationContext.Provider>
        );
    }
}

export default App;
