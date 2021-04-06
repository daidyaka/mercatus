import React, {Component} from "react";
import AuthenticationContext from "../providers/AuthenticationContext";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEdit, faMapMarkedAlt, faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import "../styles/CurrentUserInformation.css";
import HoverableImage from "./HoverableImage";
import ModalWindow from "./ModalWindow";

export default class CurrentUserInformation extends Component {

    constructor() {
        super();

        this.state = {
            openModal: false
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal() {
        this.setState({
            openModal: true
        })
    }

    closeModal() {
        this.setState({
            openModal: false
        })
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
                                        <p><b><FontAwesomeIcon icon={faMapMarkedAlt}/> {this.context.auth.user?.city}</b>
                                        </p>
                                        <p className="personal-media-link"><a href="#"><FontAwesomeIcon icon={faPhotoVideo}/> Загруженные изображения и видео</a></p>
                                        <p><a href="#"><FontAwesomeIcon icon={faComment}/> &nbsp;Мои оставленные отзывы</a></p>
                                    </div>
                                </div>
                                <div className="profile-edit-section">
                                    <Link to="/profile/edit" className="btn">
                                        <FontAwesomeIcon icon={faEdit}/> Редактировать
                                    </Link>
                                </div>
                            </div>
                            <ModalWindow isActive={this.state.openModal} onClose={this.closeModal}>
                                <form action="http://localhost:8080/media/images/upload-avatar" method="post"
                                      encType="multipart/form-data">
                                    <input type="file" name="avatar"/>
                                    <input type="submit"/>
                                </form>
                            </ModalWindow>
                        </>
                    )
                }}
            </AuthenticationContext.Consumer>
        );
    }

}

CurrentUserInformation.contextType = AuthenticationContext;
