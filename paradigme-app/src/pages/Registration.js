import React, {Component} from "react";

export default class Registration extends Component {

    componentDidMount() {
        document.title = 'Регистрация';
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/profile/create', {
            method: 'POST',
            body: new FormData(event.target)
        }).then(res => {
            if (res.status === 201) {
                location.href = '/login';
            }
        })
    }

    render() {
        return (
            <>
                <form method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <h1>Регистрация</h1>
                    <label>
                        Имя:
                        <input type="text" name="firstName"/>
                    </label>
                    <label>
                        Фамилия:
                        <input type="text" name="lastName"/>
                    </label>
                    <br/>
                    <label>
                        Фотография профиля:
                        <input type="file" name="avatar"/>
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input type="email" name="email"/>
                    </label>
                    <br/>
                    <label>
                        Пароль:
                        <input type="password" name="password"/>
                    </label>
                    <label>
                        Повторите пароль:
                        <input type="password" name="repeatPassword"/>
                    </label>
                    <hr/>
                    <label>
                        Город:
                        <input type="text" name="city"/>
                    </label>
                    <label>
                        Дата рождения:
                        <input type="date" name="dateOfBirth"/>
                    </label>
                    <label>
                        Пол:
                        <select name="gender">
                            <option>Мужской</option>
                            <option>Женский</option>
                        </select>
                    </label>
                    <hr/>
                    <label>
                        <input type="checkbox" name="isAgreed"/>
                        Я согласен с условиями использования
                    </label>
                    <hr/>
                    <button type="reset">Очистить</button>
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </>
        );
    }
};