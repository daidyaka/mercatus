import React, {Component} from "react";
import {Container, Jumbotron} from "react-bootstrap";

export default class Home extends Component {

    componentDidMount() {
        document.title = 'Paradigme | Сервис объявлений услуг';
    }

    render() {
        return (
            <div className="App">
                <Jumbotron fluid>
                    <Container>
                        <h1>Fluid jumbotron</h1>
                        <p>
                            This is a modified jumbotron that occupies the entire horizontal space of
                            its parent.
                        </p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
};