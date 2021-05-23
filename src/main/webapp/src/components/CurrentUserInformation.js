import React, {Component} from "react";
import AuthenticationContext from "../providers/AuthenticationContext";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faFileUpload,
    faMapMarkedAlt,
    faPhotoVideo,
    faSave,
    faUserSecret
} from "@fortawesome/free-solid-svg-icons";
import "../styles/CurrentUserInformation.css";
import HoverableImage from "./HoverableImage";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import DragNDropComponent from "./DragNDropComponent";
import i18n from "../services/i18n/i18n";
import network from "../services/network/network";

export default class CurrentUserInformation extends Component {

    constructor() {
        super();

        this.state = {
            showUpdateProfile: false,
            showUpload: false,
            image: null
        }

        this.showUploadModal = this.showUploadModal.bind(this);
        this.closeUploadModal = this.closeUploadModal.bind(this);
    }

    showUploadModal() {
        this.setState({showUpload: true})
    }

    closeUploadModal() {
        this.setState({showUpload: false})
    }

    showUpdateProfileModal = () => {
        this.setState({showUpdateProfile: true})
    }

    closeUpdateProfileModal = () => {
        this.setState({showUpdateProfile: false})
    }

    render() {
        return (
            <AuthenticationContext.Consumer>
                {() => {
                    return (
                        <>
                            <div className="profile-data margin-header">
                                <div className="profile-avatar-name">
                                    <HoverableImage caption="Изменить фото" handleClick={this.showUploadModal}/>
                                    <div>
                                        <h1>{this.context.auth.user?.firstName} {this.context.auth.user?.lastName}</h1>
                                        <p><b><FontAwesomeIcon icon={faMapMarkedAlt}/> {this.context.auth.user?.city}
                                        </b>
                                        </p>
                                        <p className="personal-media-link">
                                            <Link to="/profile/media">
                                                <FontAwesomeIcon
                                                    icon={faPhotoVideo}/> {i18n.get('profile.loaded-media')}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="profile-edit-section">
                                    <Button onClick={this.showUpdateProfileModal}>
                                        <FontAwesomeIcon icon={faEdit}/> {i18n.get('profile.edit.btn')}
                                    </Button>
                                </div>
                            </div>

                            {/* UPDATE AVATAR MODAL */}
                            <Modal show={this.state.showUpload} onHide={this.closeUploadModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{i18n.get('userMedia.upload.modal.title')}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className={"row justify-content-md-center"}>
                                    <DragNDropComponent handleDrop={this.handleDrop}>
                                        <Container className={"modal-container-upload"}>
                                            <Row>
                                                <Col className={"modal-container-upload__icon"}>
                                                    <FontAwesomeIcon icon={faFileUpload}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p className="modal-container-upload__description">
                                                        {i18n.get('userMedia.upload.modal.message')}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </DragNDropComponent>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-danger" onClick={this.closeUploadModal}>
                                        {i18n.get('close')}
                                    </Button>
                                    <Button variant="success" onClick={this.updateAvatar}>
                                        {i18n.get('load')}
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            {/* UPDATE USER DATA MODAL */}
                            <Modal size="lg" show={this.state.showUpdateProfile} onHide={this.closeUpdateProfileModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        {i18n.get('profile.edit')}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h5>{i18n.get('profile.edit.personal-info.title')}</h5>
                                    <Form action="/profile/update" onSubmit={this.handleForm}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>{i18n.get('registration.firstName.label')}: </Form.Label>
                                                <Form.Control value={
                                                    this.state.firstName !== undefined
                                                        ? this.state.firstName
                                                        : this.context.auth.user?.firstName
                                                } name="firstName" onChange={this.handleUserUpdateInfo}/>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>{i18n.get('registration.lastName.label')}: </Form.Label>
                                                <Form.Control value={
                                                    this.state.lastName !== undefined
                                                        ? this.state.lastName
                                                        : this.context.auth.user?.lastName
                                                } name="lastName" onChange={this.handleUserUpdateInfo}/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} xs={6}>
                                                <Form.Label>{i18n.get('registration.city.label')}: </Form.Label>
                                                <Form.Control value={
                                                    this.state.city !== undefined
                                                        ? this.state.city
                                                        : this.context.auth.user?.city
                                                } name="city" onChange={this.handleUserUpdateInfo}/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className={"justify-content-end mb-4"}>
                                            <Button variant="success" type="submit">
                                                <FontAwesomeIcon icon={faSave}/> {i18n.get('save')}
                                            </Button>
                                        </Form.Row>
                                    </Form>
                                    <hr/>

                                    <h5>{i18n.get('profile.edit.password.title')}</h5>
                                    <Form action="/profile/update-password" onSubmit={this.handleForm}>
                                        <Form.Row>
                                            <Form.Group as={Col} xs={6}>
                                                <Form.Label>{i18n.get('profile.edit.password.current')}: </Form.Label>
                                                <Form.Control placeholder="********"
                                                              type="password"
                                                              name="oldPassword"/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>{i18n.get('profile.edit.password.new')}: </Form.Label>
                                                <Form.Control placeholder="********"
                                                              type="password"
                                                              name="newPassword"/>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>{i18n.get('profile.edit.password.new-repeated')}: </Form.Label>
                                                <Form.Control placeholder="********"
                                                              type="password"
                                                              name="newPasswordRepeated"/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className={"justify-content-end mb-4"}>
                                            <Button variant="success" type="submit">
                                                <FontAwesomeIcon icon={faUserSecret}/> {i18n.get('save')}
                                            </Button>
                                        </Form.Row>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </>
                    );
                }}
            </AuthenticationContext.Consumer>
        );
    }

    handleDrop = (files) => {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!file.name) return

            if (file.type === 'image/jpeg') {
                this.setState({image: file})
                this.updateAvatar();
                return;
            }
        }
    }

    updateAvatar = () => {
        if (this.state.image) {
            let formData = new FormData();
            formData.append('avatar', this.state.image)
            network.sendForm('/media/images/upload-avatar', {
                method: 'POST',
                body: formData
            }, undefined, (res) => location.reload())
        }
    }

    handleForm = (event) => {
        network.sendForm(event.target.getAttribute('action'), {
            method: 'POST',
            body: new FormData(event.target)
        }, event, () => location.reload())
    }

    handleUserUpdateInfo = ({target}) => {
        let attribute = target.getAttribute('name');
        this.setState({[attribute]: target.value})
    }

}

CurrentUserInformation.contextType = AuthenticationContext;
