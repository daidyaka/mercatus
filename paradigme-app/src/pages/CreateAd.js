import React, {Component} from "react";

export default class CreateAd extends Component {

    constructor() {
        super();

        this.state = {
            title: '',
            type: '',
            phoneNumber: '',
            elements: []
        };

        this.createAd = this.createAd.bind(this);
        this.addElement = this.addElement.bind(this);
    }

    createAd() {
        let url = "/profile/create-ad";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                type: this.state.type,
                elements: this.state.elements,
                phoneNumber: document.querySelector('input[name="phoneNumber"]').value
            })
        }).then(response => {
            if (response.ok && response.status === 201) {
                window.location = `${response.headers.get('Location')}.html`;
            }
        });
    }

    addElement(event) {
        let elementType = event.target.getAttribute('el-type');
        let createdElement = this.componentToObjectMapping[elementType](event.target);

        let elements = this.state.elements;
        elements.push(createdElement);
        this.setState(state => ({
            title: state.title,
            type: state.type,
            phoneNumber: state.phoneNumber,
            elements: elements
        }))
    }

    render() {
        return (
            <>
                <label>
                    Заголовок:
                    <input type="text" name="title" value={this.state.title}/>
                    Категория объявления:
                    <select name="type" className="adv-type-select" value={this.state.type}/>
                </label>
                <label>
                    Номер телефона для связи:
                    <input type="text" name="phoneNumber" value={this.state.phoneNumber}/>
                </label>
                <hr/>
                <button type="button" el-type="text" onClick={this.addElement}>Добавить текст</button>
                <button type="button" el-type="image" onClick={this.addElement}>Добавить картинку</button>
                <button type="button" el-type="video" onClick={this.addElement}>Добавить видео</button>
                <hr/>
                <div id="drop-adv-elements">
                    {this.state.elements.map(el => {
                        if (el.type === 'video') {
                            return (
                                <>
                                    <br/>
                                    <input type="text" placeholder="Ссылка на видео Youtube"/>
                                </>
                            )
                        }
                        if (el.type === 'image') {
                            return (
                                <>
                                    <br/>
                                    <input type="text" placeholder="Ссылка на личные медиа"/>
                                </>
                            )
                        }
                        if (el.type === 'text') {
                            return (
                                <>
                                    <br/>
                                    <textarea placeholder="Текст" cols="50" rows="10"/>
                                </>
                            )
                        }
                    })}
                </div>
                <hr/>
                <button type="button" id="adv-submit" onClick={this.createAd}>Создать</button>
            </>
        )
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

};