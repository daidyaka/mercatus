import React, {Component} from "react";
import {toUrlParams} from "../services/url-parser";

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
            <form action={'#'} method="post" onSubmit={this.handleSubmit}>
                <h1>Авторизация</h1>
                <label>
                    Email:
                    <input type="email" name="username" value={this.state.username} onChange={this.handleInput}/>
                </label>
                <br/>
                <label>
                    Пароль:
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                </label>
                <button type="submit">Войти</button>
            </form>
        );
    }
}