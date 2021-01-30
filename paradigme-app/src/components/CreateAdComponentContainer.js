import React, {Component} from "react";

export default class CreateAdComponentContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: []
        }

        this.updateElements = props.updateElements;
        this.addElement = this.addElement.bind(this);
        this.sendElements = this.sendElements.bind(this);

        this.handleVideo = this.handleVideo.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    addElement(event) {
        let elementType = event.target.getAttribute('el-type');
        let createdElement = this.componentToObjectMapping[elementType](event.target);

        let elements = this.state.elements;
        elements.push(createdElement);
        this.sendElements(elements);
    }

    render() {
        return (
            <>
                <button type="button" el-type="text" onClick={this.addElement}>Добавить текст</button>
                <button type="button" el-type="image" onClick={this.addElement}>Добавить картинку</button>
                <button type="button" el-type="video" onClick={this.addElement}>Добавить видео</button>
                <hr/>
                <div id="drop-adv-elements">
                    {this.state.elements.map((el, index) => {
                        if (el.type === 'video') {
                            return (
                                <>
                                    <br/>
                                    <input type="text" placeholder="Ссылка на видео Youtube"
                                           key={index}
                                           value={this.state.elements[index].text}
                                           onChange={this.handleVideo.bind(this, index)}/>
                                </>
                            )
                        }
                        if (el.type === 'image') {
                            return (
                                <>
                                    <br/>
                                    <input type="text" placeholder="Ссылка на личные медиа"
                                           onChange={this.handleImage.bind(this, index)}
                                           key={index}/>
                                </>
                            )
                        }
                        if (el.type === 'text') {
                            return (
                                <>
                                    <br/>
                                    <textarea placeholder="Текст" cols="50" rows="10"
                                              onChange={this.handleText.bind(this, index)}
                                              key={index}/>
                                </>
                            )
                        }
                        return <></>;
                    })}
                </div>
            </>
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

    handleText(index, event) {
        let elements = this.state.elements;
        elements[index].text = event.target.value;
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