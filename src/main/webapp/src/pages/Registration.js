import React, {Component} from "react";
import {Button, Col, Form, FormFile, Image} from "react-bootstrap";
import "../styles/Registarion.css";
import i18n from "../services/i18n/i18n";

export default class Registration extends Component {

    componentDidMount() {
        document.title = i18n.get('registration');
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
            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <h1 className={"mt-4"}>Регистрация</h1>

                <hr/>

                <Form.Row className={"mt-4 justify-content-center"}>
                    <FormFile.Label>
                        <Image src="http://via.placeholder.com/150x150" roundedCircle/>
                        <FormFile.Input name="avatar" className={"avatar-upload"}/>
                    </FormFile.Label>
                </Form.Row>

                <Form.Row className={"mt-2"}>
                    <Form.Group as={Col} controlId="formGridFirstname">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" placeholder="Введите имя" name="firstName"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastname">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text" placeholder="Введите фамилию" name="lastName"/>
                    </Form.Group>
                </Form.Row>

                <hr/>

                <Form.Row className={"mt-4"}>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" name={"email"}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите пароль" name={"password"}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Повторите пароль</Form.Label>
                        <Form.Control type="password" placeholder="Повторите пароль" name={"repeatPassword"}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Город</Form.Label>
                        <Form.Control name={"city"}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGender">
                        <Form.Label>Пол</Form.Label>
                        <Form.Control as="select" defaultValue="Не указан" name={"gender"}>
                            <option>Мужской</option>
                            <option>Женский</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBirth">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type={"date"} name={"dateOfBirth"}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Я согласен с условиями использования" name="isAgreed"/>
                </Form.Group>

                <Form.Row className={"justify-content-end mb-4"}>
                    <Button variant="outline-danger" type="reset">
                        Очистить
                    </Button>
                    <Button variant="success" type="submit" className={"ml-4"}>
                        Зарегистрироваться
                    </Button>
                </Form.Row>
            </Form>
        );
    }
};