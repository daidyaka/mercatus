import React, {Component} from "react";
import {Button, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faFileUpload, faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import "../styles/PersonalMedia.css";
import DragNDropComponent from "../components/DragNDropComponent";

export default class PersonalMedia extends Component {

    state = {
        filesToUpload: [],
        showUpload: false,
        files: []
    }

    handleDrop = (files) => {
        let fileList = this.state.filesToUpload
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i])
        }
        this.setState({files: fileList})
    }

    showUploadModal = () => {
        this.setState({showUpload: true})
    }

    closeUploadModal = () => {
        this.setState({showUpload: false})
    }

    componentDidMount() {
        this.fetchFiles();
    }

    render() {
        return (
            <>
                <div>
                    <hr/>
                    {!this.state.filesToUpload.length ? 'Буфер к загрузке пуст' : this.state.filesToUpload.map((file) =>
                        <div>{file.name}</div>
                    )}
                    <hr/>
                    <Button variant={"success"} onClick={this.showUploadModal} size="lg" block>
                        <FontAwesomeIcon icon={faUpload}/> Загрузить файл(ы)
                    </Button>
                    <hr/>
                    <Row>
                        {this.state.files.map((file) =>
                            <Col xs={6} md={4}>
                                {file.image ? (
                                        <div>
                                            <Image src={file.link} thumbnail/>
                                            <Button className={"remove-upload-file"} variant={"danger"}
                                                    filename={file.name}
                                                    onClick={this.deleteFile}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </div>
                                    ) :
                                    (<>
                                        <div className="img-thumbnail uploaded-file">
                                            <a href={`localhost:8080${file.link}`}>
                                                <FontAwesomeIcon icon={faFileDownload}/>
                                                <br/>
                                                <p>{file.name}</p>
                                            </a>
                                        </div>
                                        <Button variant={"danger"} className={"remove-upload-file"}
                                                filename={file.name}
                                                onClick={this.deleteFile}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Button>
                                    </>)}
                            </Col>
                        )}
                    </Row>
                </div>

                <Modal show={this.state.showUpload} onHide={this.closeUploadModal}>
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
                        <Button variant="outline-danger" onClick={this.closeUploadModal}>
                            Закрыть
                        </Button>
                        <Button variant="success" onClick={this.uploadFiles}>
                            Загрузить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    uploadFiles = () => {
        let formData = new FormData()
        this.state.filesToUpload.forEach(file => formData.append('files', file));

        fetch('/media/upload', {
            method: 'POST',
            body: formData
        }).then(() => window.location.reload())
    }

    fetchFiles = () => {
        fetch('/media/my/all')
            .then(res => res.json())
            .then(files => this.setState({files}))
    }

    deleteFile = ({target}) => {

        let fileName = target.getAttribute('filename');
        let url = `/media/my/${fileName}/remove`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => res.text()).then((t) => {
            if (t === 'true') {
                this.fetchFiles()
            }
        })
    }
}