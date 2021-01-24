import React, {Component} from "react";

export default class Login extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        document.title = 'Авторизация';
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/profile/login', {
            method: 'POST',
            body: new FormData(event.target)
        }).then(response => response.text())
            .then(jwtToken => localStorage.setItem('jwt', jwtToken))
            .then(() => location.href='/profile')
    }

    render() {
        return (
            <form action={'#'} method="post" onSubmit={this.handleSubmit}>
                <h1>Авторизация</h1>
                <label>
                    Email:
                    <input type="email" name="username"/>
                </label>
                <br/>
                <label>
                    Пароль:
                    <input type="password" name="password"/>
                </label>
                <button type="submit">Войти</button>
            </form>
        );
    }
}