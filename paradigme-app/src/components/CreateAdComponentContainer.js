import React, {Component} from "react";
import "../styles/CreateAdComponentContainer.css";
import {faPhotoVideo, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RichTextEditor from 'react-rte';

export default class CreateAdComponentContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            images: [],
            showImageModal: false
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

        if (elementType === 'image') {
            this.setState({
                showImageModal: true
            });
        }

        let createdElement = this.componentToObjectMapping[elementType](event.target);

        let elements = this.state.elements;
        elements.push(createdElement);
        this.sendElements(elements);
    }

    removeElement({index}, event) {
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
                                    <input type="text" placeholder="Ссылка на видео Youtube"
                                           value={this.state.elements[index].text}
                                           onChange={this.handleVideo.bind(this, index)}/>
                                    <button className="btn red" type="button"
                                            onClick={this.removeElement.bind(this, {index})}>&nbsp;&times;&nbsp;</button>
                                </div>
                            )
                        }
                        if (el.type === 'image') {
                            return (
                                <div key={index} className="add-image">
                                    <br/>
                                    <input type="text" placeholder="Ссылка на личные медиа"
                                           onChange={this.handleImage.bind(this, index)}/>
                                    <button className="btn red" type="button"
                                            onClick={this.removeElement.bind(this, {index})}>&nbsp;&times;&nbsp;</button>
                                </div>
                            )
                        }
                        if (el.type === 'text') {
                            return (
                                <div key={index} className="add-text">
                                    <br/>
                                    <RichTextEditor
                                        value={el.rteVal}
                                        toolbarConfig={this.toolbarConfig}
                                        onChange={this.handleText.bind(this, index)}
                                    />
                                    <button className="btn red" type="button"
                                            onClick={this.removeElement.bind(this, {index})}>&nbsp;&times;&nbsp;</button>
                                </div>
                            )
                        }
                        return <></>;
                    })}
                </div>
            </div>
        );
    }

    handleVideo(index, event) {
        let elements = this.state.elements;
        elements[index].videoLink = event.target.value;
        this.sendElements(elements);
    }

    handleImage(index, event) {
        let elements = this.state.elements;
        elements[index].src = event.target.value;
        this.sendElements(elements);
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

    toolbarConfig = {
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
            {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
            {label: 'Italic', style: 'ITALIC'},
            {label: 'Underline', style: 'UNDERLINE'}
        ],
        BLOCK_TYPE_DROPDOWN: [
            {label: 'Normal', style: 'unstyled'},
            {label: 'Heading Large', style: 'header-one'},
            {label: 'Heading Medium', style: 'header-two'},
            {label: 'Heading Small', style: 'header-three'}
        ],
        BLOCK_TYPE_BUTTONS: [
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'}
        ]
    };


}