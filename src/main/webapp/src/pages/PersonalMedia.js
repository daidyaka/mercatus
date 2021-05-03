import React, {Component} from "react";
import {Alert, Button, Col, Container, Image, Modal, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faFileUpload, faTrash, faUpload, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import "../styles/PersonalMedia.css";
import DragNDropComponent from "../components/DragNDropComponent";
import i18n from "../services/i18n/i18n";

export default class PersonalMedia extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
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
                            {i18n.get('userMedia.upload.error')}
                        </Alert>
                    ) : <></>}
                    <hr/>
                    <Button variant={"success"} onClick={this.showUploadModal} size="lg" block>
                        <FontAwesomeIcon icon={faUpload}/> {i18n.get('userMedia.upload')}
                    </Button>
                    <hr/>
                    <Row>
                        {this.state.loaded ? (this.state.files.length ? (this.state.files.map((file) =>
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
                                )
                            ) : (
                                <Col style={{textAlign: 'center', fontSize: 35}}>
                                    <FontAwesomeIcon icon={faWindowClose}/>
                                    <p>{i18n.get('userMedia.upload.files-not-found')}</p>
                                </Col>
                            )
                        ) : (
                            <Col style={{textAlign: 'center'}}>
                                <Spinner animation="border" />
                                <p>{i18n.get('loading')}</p>
                            </Col>
                        )}
                    </Row>
                </div>

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
                        <Button variant="success" onClick={this.uploadFiles}>
                            {i18n.get('load')}
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
        this.setState({loaded: false});

        fetch('/media/my/all')
            .then(res => res.json())
            .then(files => this.setState({files}))
            .then(() => this.setState({showError: false, loaded: true}))
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