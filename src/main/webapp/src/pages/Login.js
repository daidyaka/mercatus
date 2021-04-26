import React, {Component} from "react";
import {toUrlParams} from "../services/url-parser";
import {Button, Col, Form, Row} from "react-bootstrap";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'Авторизация';
    }

    handleInput({target}) {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/profile/login?' + toUrlParams(this.state), {
            method: 'POST'
        }).then(response => {
            if (response.status === 200) {
                response.text()
                    .then(jwtToken => localStorage.setItem('jwt', jwtToken))
                    .then(() => location.href = '/profile')
            }
        })
    }

    render() {
        return (
            <Form action={'#'} method="post" onSubmit={this.handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col xs={5}>
                        <h1>Авторизация</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-4">
                    <Col xs={5}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" name="username" value={this.state.username}
                                      onChange={this.handleInput}/>
                    </Col>
                </Row>
                <Row className={"justify-content-md-center mt-4"} >
                    <Col xs={5}>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите пароль" name="password" value={this.state.password}
                                      onChange={this.handleInput}/>
                    </Col>
                </Row>
                <Row className={"justify-content-md-center mt-4"} xs={5}>
                    <Button variant="success" type="submit">
                        Войти
                    </Button>
                </Row>
            </Form>
        );
    }
}