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
    }

    showModal() {
        this.setState({
            openModal: true
        })
    }

    render() {
        return (
            <AuthenticationContext.Consumer>
                {() => {
                    return (
                        <>
                            <div className="profile-data">
                                <div className="profile-avatar-name">
                                    <HoverableImage caption="Изменить фото" handleClick={this.showModal}/>
                                    <div>
                                        <h1>{this.context.auth.user?.firstName} {this.context.auth.user?.lastName}</h1>
                                        <p><b><FontAwesomeIcon icon={faMapMarkedAlt}/> Харьков, Харьковская область</b>
                                        </p>
                                        <p className="personal-media-link"><a href="#"><FontAwesomeIcon icon={faPhotoVideo}/>Загруженные изображения и видео</a></p>
                                        <p><a href="#"><FontAwesomeIcon icon={faComment}/>Мои отзывы</a></p>
                                    </div>
                                </div>
                                <div className="profile-edit-section">
                                    <Link to="/profile/edit" className="btn">
                                        <FontAwesomeIcon icon={faEdit}/> Редактировать
                                    </Link>
                                </div>
                            </div>
                            <ModalWindow markup={(
                                <>
                                    <form action="http://localhost:8080/media/images/upload-avatar" method="post"
                                          encType="multipart/form-data">
                                        <input type="file" name="avatar"/>
                                        <input type="submit"/>
                                    </form>
                                </>
                            )} isActive={this.state.openModal}/>
                        </>
                    )
                }}
            </AuthenticationContext.Consumer>
        );
    }

}

CurrentUserInformation.contextType = AuthenticationContext;
