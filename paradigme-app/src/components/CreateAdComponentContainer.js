import React, {Component} from "react";
import "../styles/CreateAdComponentContainer.css";
import {faPhotoVideo, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RichTextEditor from 'react-rte';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import PersonalMedia from "../pages/PersonalMedia";
import RTEConfigs from "../providers/RTEConfigs";

export default class CreateAdComponentContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            images: [],
            showImageModal: false,
            chooseImage: null
        }

        this.updateElements = props.updateElements;
        this.createButton = props.createButton;
        this.addElement = this.addElement.bind(this);
        this.sendElements = this.sendElements.bind(this);

        this.handleVideo = this.handleVideo.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    componentDidMount() {
        fetch('/media/images/my/all').then(res => res.json())
            .then(images => this.setState({
                images: images
            }));
    }

    addElement(event) {
        let elementType = event.target.getAttribute('el-type');

        let createdElement = this.componentToObjectMapping[elementType](event.target);

        let elements = this.state.elements;
        elements.push(createdElement);
        this.sendElements(elements);
    }

    removeElement({index}) {
        let elements = this.state.elements;
        elements[index] = null;
        this.sendElements(elements.filter(el => el !== null));
    }

    render() {
        return (
            <div>
                <div className="flex space-even">
                    <button type="button" className="btn green">
                        <FontAwesomeIcon icon={faPhotoVideo}/> Выбрать главное фото
                    </button>
                    <button className="btn green" type="button" el-type="text" onClick={this.addElement}>
                        <FontAwesomeIcon icon={faPlus}/> Добавить текст
                    </button>
                    <button className="btn green" type="button" el-type="image" onClick={this.addElement}>
                        <FontAwesomeIcon icon={faPlus}/> Добавить картинку
                    </button>
                    <button className="btn green" type="button" el-type="video" onClick={this.addElement}>
                        <FontAwesomeIcon icon={faPlus}/> Добавить видео
                    </button>
                    {this.createButton}
                </div>
                <hr/>
                <div className="drop-adv-elements">
                    {this.state.elements.map((el, index) => {
                        if (el.type === 'video') {
                            return (
                                <div key={index} className="add-video">
                                    <br/>
                                    <InputGroup>
                                        <Form.Control type="text" placeholder="Ссылка на видео Youtube"
                                                      value={this.state.elements[index].text}
                                                      onChange={this.handleVideo.bind(this, index)}/>
                                        <InputGroup.Append>
                                            <Button variant="danger"
                                                    onClick={this.removeElement.bind(this, {index})}>&nbsp;&times;&nbsp;</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            )
                        }
                        if (el.type === 'image') {
                            return (
                                <div key={index} className="add-image">
                                    <br/>
                                    <InputGroup>
                                        <Form.Control type="text" placeholder="Ссылка на личные медиа"
                                                      value={el.src}
                                                      onClick={() => {
                                                          this.showModal(this.handleImage.bind(this, index));
                                                      }}
                                                      readOnly={true}/>
                                        <InputGroup.Append>
                                            <Button variant="danger"
                                                    onClick={this.removeElement.bind(this, {index})}>&nbsp;&times;&nbsp;</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            )
                        }
                        if (el.type === 'text') {
                            return (
                                <div key={index} className="add-text">
                                    <br/>
                                    <RichTextEditor
                                        value={el.rteVal}
                                        toolbarConfig={RTEConfigs}
                                        onChange={this.handleText.bind(this, index)}
                                    />
                                    <Button variant={"danger"} type="button"
                                            onClick={this.removeElement.bind(this, {index})}>&nbsp;&times;&nbsp;</Button>
                                </div>
                            )
                        }
                        return <></>;
                    })}
                </div>
                <Modal show={this.state.showImageModal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Выбор изображения</h3>
                        <PersonalMedia onImageChose={this.state.handleImageClick}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    showModal = (whatToDo) => {
        this.setState({showImageModal: true, handleImageClick: whatToDo});
    }

    closeModal = () => {
        this.setState({showImageModal: false})
    }

    handleVideo(index, event) {
        let elements = this.state.elements;
        elements[index].videoLink = event.target.value;
        this.sendElements(elements);
    }

    handleImage(index, event) {
        let elements = this.state.elements;
        elements[index].src = event.target.getAttribute('filename');
        this.sendElements(elements);
        this.closeModal();
    }

    handleText(index, value) {
        let elements = this.state.elements;
        elements[index].rteVal = value;
        elements[index].text = value.toString('html');
        this.sendElements(elements);
    }

    sendElements(elements) {
        this.setState({elements});
        this.updateElements(this.state.elements);
    }

    componentToObjectMapping = {
        'video': (el) => {
            return {
                type: 'video',
                videoLink: el.value
            }
        },
        'text': (el) => {
            return {
                type: 'text',
                rteVal: RichTextEditor.createEmptyValue(),
                text: el.value
            }
        },
        'image': (el) => {
            return {
                type: 'image',
                src: `/media/images/userId/${el.value}`
            }
        }
    };

}