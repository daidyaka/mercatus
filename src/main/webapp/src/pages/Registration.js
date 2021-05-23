import React, {Component} from "react";
import {Button, Col, Form, FormFile, Image} from "react-bootstrap";
import "../styles/Registarion.css";
import i18n from "../services/i18n/i18n";
import network from "../services/network/network";

export default class Registration extends Component {

    componentDidMount() {
        document.title = i18n.get('registration.title');
    }

    handleSubmit(event) {
        network.sendForm('/profile/create', {
            method: 'POST',
            body: new FormData(event.target)
        }, event, res => {
            if (res.status === 201) {
                location.href = '/login';
            }
        })
    }

    render() {
        return (
            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <h1 className={"mt-4"}>{i18n.get('registration.title')}</h1>

                <hr/>

                <Form.Row className={"mt-4 justify-content-center"}>
                    <FormFile.Label>
                        <Image src="http://via.placeholder.com/150x150" roundedCircle/>
                        <FormFile.Input name="avatar" className={"avatar-upload"}/>
                    </FormFile.Label>
                </Form.Row>

                <Form.Row className={"mt-2"}>
                    <Form.Group as={Col} controlId="formGridFirstname">
                        <Form.Label>{i18n.get('registration.firstName.label')}</Form.Label>
                        <Form.Control type="text" placeholder={i18n.get('registration.firstName.placeholder')} name="firstName"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastname">
                        <Form.Label>{i18n.get('registration.lastName.label')}</Form.Label>
                        <Form.Control type="text" placeholder={i18n.get('registration.lastName.placeholder')} name="lastName"/>
                    </Form.Group>
                </Form.Row>

                <hr/>

                <Form.Row className={"mt-4"}>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder={i18n.get('registration.email.placeholder')} name={"email"}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>{i18n.get('registration.password.label')}</Form.Label>
                        <Form.Control type="password" placeholder={i18n.get('registration.password.placeholder')} name={"password"}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>{i18n.get('registration.repeatPassword.placeholder')}</Form.Label>
                        <Form.Control type="password" placeholder={i18n.get('registration.repeatPassword.placeholder')} name={"repeatPassword"}/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>{i18n.get('registration.city.label')}</Form.Label>
                        <Form.Control name={"city"} placeholder={i18n.get('registration.city.label')}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGender">
                        <Form.Label>{i18n.get('registration.gender.label')}</Form.Label>
                        <Form.Control as="select" defaultValue={i18n.get('registration.gender.not-selected')} name={"gender"}>
                            <option>{i18n.get('registration.gender.men')}</option>
                            <option>{i18n.get('registration.gender.women')}</option>
                            <option>{i18n.get('registration.gender.not-selected')}</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBirth">
                        <Form.Label>{i18n.get('registration.dateOfBirth.label')}</Form.Label>
                        <Form.Control type={"date"} name={"dateOfBirth"}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label={i18n.get('registration.isAgreed.label')} name="isAgreed"/>
                </Form.Group>

                <Form.Row className={"justify-content-end mb-4"}>
                    <Button variant="outline-danger" type="reset">
                        {i18n.get('clear')}
                    </Button>
                    <Button variant="success" type="submit" className={"ml-4"}>
                        {i18n.get('register')}
                    </Button>
                </Form.Row>
            </Form>
        );
    }
};