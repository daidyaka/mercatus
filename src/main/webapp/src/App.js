import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import PersonalMedia from "./pages/PersonalMedia";
import CreateAd from "./pages/CreateAd";
import AuthenticationContext from "./providers/AuthenticationContext";
import AdPage from "./pages/AdPage";
import Search from "./pages/Search";
import {Container} from "react-bootstrap";

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
                    <Container id="root">
                        <Switch>
                            <Route path={'/ad/:title'}><AdPage/></Route>
                            <Route path={'/profile/media'}><PersonalMedia/></Route>
                            <Route path={'/profile/create-ad'}><CreateAd/></Route>
                            <Route path={'/profile'}><Profile/></Route>
                            <Route path={'/search'}><Search/></Route>
                            <Route path={'/registration'}><Registration/></Route>
                            <Route path={'/login'}><Login/></Route>
                            <Route exact path={'/'}><Home/></Route>
                            <Route path={'*'}><NotFound/></Route>
                        </Switch>
                    </Container>
                </Router>
            </AuthenticationContext.Provider>
        );
    }
}

export default App;