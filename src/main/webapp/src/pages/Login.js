import React, {Component} from "react";
import {toUrlParams} from "../services/url-parser";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import i18n from "../services/i18n/i18n";
import network from "../services/network/network";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            notFound: false
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = i18n.get('login.title');
    }

    handleInput({target}) {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit(event) {
        this.setState({notFound: false})
        network.sendForm('/profile/login?' + toUrlParams(this.state), {
                method: 'POST'
            },
            event,
            () => location.href = '/profile',
            response => {
                if (response.status === 403) {
                    this.setState({notFound: true})
                }

                if (response.status === 400) {
                    response.json().then(res => {
                        console.log(res.message)

                        for (const [key, value] of Object.entries(res.errors)) {
                            let element = document.querySelector(`[name="${key}"]`);
                            if (element) {
                                let feedback = document.createElement('div');
                                element.classList.add('is-invalid');
                                feedback.classList.add('invalid-feedback');
                                feedback.textContent = value;
                                element.parentNode.append(feedback)
                            }
                        }
                    });
                }
            })
    }

    render() {
        return (
            <Form action={'#'} method="post" onSubmit={this.handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col xs={5}>
                        <h1>{i18n.get('login.title')}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-4">
                    <Col xs={5}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                                      placeholder={i18n.get('login.email.placeholder')}
                                      name="username"
                                      value={this.state.username}
                                      onChange={this.handleInput}/>
                    </Col>
                </Row>
                <Row className={"justify-content-md-center mt-4"}>
                    <Col xs={5}>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"
                                      placeholder={i18n.get('login.password.placeholder')}
                                      name="password"
                                      value={this.state.password}
                                      onChange={this.handleInput}/>
                    </Col>
                </Row>
                {this.state.notFound ? <p style={{textAlign: 'center', color: 'indianred'}}
                                          className={"mt-4"}>{i18n.get('login.not-found')}</p> : <></>}
                <Row className={"justify-content-md-center mt-4"} xs={5}>
                    <Button variant="success" type="submit">
                        {i18n.get('login')}
                    </Button>
                </Row>
                <div className="mt-4 mb-4" style={{textAlign: 'center'}}>
                    {i18n.get('login.no-account.promotion')} <Link
                    to="/registration">{i18n.get('login.no-account.link')}</Link>.
                </div>
            </Form>
        );
    }
}