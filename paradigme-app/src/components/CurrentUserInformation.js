import React, {Component} from "react";
import AuthenticationContext from "../providers/AuthenticationContext";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEdit, faFileUpload, faMapMarkedAlt, faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import "../styles/CurrentUserInformation.css";
import HoverableImage from "./HoverableImage";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import DragNDropComponent from "./DragNDropComponent";

export default class CurrentUserInformation extends Component {

    constructor() {
        super();

        this.state = {
            showUpload: false,
            image: null
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal() {
        this.setState({showUpload: true})
    }

    closeModal() {
        this.setState({showUpload: false})
    }

    render() {
        return (
            <AuthenticationContext.Consumer>
                {() => {
                    return (
                        <>
                            <div className="profile-data margin-header">
                                <div className="profile-avatar-name">
                                    <HoverableImage caption="Изменить фото" handleClick={this.showModal}/>
                                    <div>
                                        <h1>{this.context.auth.user?.firstName} {this.context.auth.user?.lastName}</h1>
                                        <p><b><FontAwesomeIcon icon={faMapMarkedAlt}/> {this.context.auth.user?.city}
                                        </b>
                                        </p>
                                        <p className="personal-media-link"><Link to="/profile/media"><FontAwesomeIcon
                                            icon={faPhotoVideo}/> Загруженные изображения и видео</Link></p>
                                        <p><a href="#"><FontAwesomeIcon icon={faComment}/> &nbsp;Мои оставленные отзывы</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="profile-edit-section">
                                    <Link to="/profile/edit" className="btn">
                                        <FontAwesomeIcon icon={faEdit}/> Редактировать
                                    </Link>
                                </div>
                            </div>

                            <Modal show={this.state.showUpload} onHide={this.closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Загрузить файлы в хранилище</Modal.Title>
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
                                                        Перетащите файл или кликните в эту область
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </DragNDropComponent>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-danger" onClick={this.closeModal}>
                                        Закрыть
                                    </Button>
                                    <Button variant="success" onClick={this.updateAvatar}>
                                        Загрузить
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    )
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
            fetch('/media/images/upload-avatar', {
                method: 'POST',
                body: formData
            }).then(() => location.reload())
        }
    }

}

CurrentUserInformation.contextType = AuthenticationContext;
