import React, {Component} from "react";
import {Alert, Button, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faFileUpload, faTrash, faUpload, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import "../styles/PersonalMedia.css";
import DragNDropComponent from "../components/DragNDropComponent";

export default class PersonalMedia extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filesToUpload: [],
            showUpload: false,
            files: [],
            showError: false
        };

        this.onImageChose = props.onImageChose ? props.onImageChose : () => {
        };
    }

    handleDrop = (files) => {
        let fileList = this.state.filesToUpload
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i])
        }
        this.setState({filesToUpload: fileList})
        this.uploadFiles();
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
                    {this.state.showError ? (
                        <Alert variant={'danger'}>
                            Во время удаления файл не был удален, попробуйте позже.
                        </Alert>
                    ) : <></>}
                    <hr/>
                    <Button variant={"success"} onClick={this.showUploadModal} size="lg" block>
                        <FontAwesomeIcon icon={faUpload}/> Загрузить файл(ы)
                    </Button>
                    <hr/>
                    <Row>

                        {this.state.files.length ? (this.state.files.map((file) =>
                                <Col xs={6} md={4}>
                                    {file.image ? (
                                            <div onClick={this.onImageChose}>
                                                <Image src={file.link} filename={file.name} thumbnail/>
                                                <Button className={"remove-upload-file"} variant={"danger"}
                                                        filename={file.name}
                                                        onClick={this.deleteFile}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </Button>
                                            </div>
                                        ) :
                                        (<>
                                            <div className="img-thumbnail uploaded-file" filename={file.name}
                                                 onClick={this.onImageChose}>
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
                            )) :
                            (<Col style={{textAlign: 'center', fontSize: 35}}>
                                <FontAwesomeIcon icon={faWindowClose}/>
                                <p>Файлы не найдены</p>
                            </Col>)}
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
        }).then(() => this.fetchFiles()).then(() => this.closeUploadModal())
    }

    fetchFiles = () => {
        fetch('/media/my/all')
            .then(res => res.json())
            .then(files => this.setState({files}))
            .then(() => this.setState({showError: false}))
    }

    deleteFile = ({target}) => {

        if (target.tagName === 'path') {
            target = target.parentNode.parentNode;
        }

        let fileName = target.getAttribute('filename');
        let url = `/media/my/${fileName}/remove`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => res.text()).then((t) => {
            if (t === 'true') {
                this.fetchFiles()
            } else {
                this.setState({showError: true})
            }
        })
    }
}