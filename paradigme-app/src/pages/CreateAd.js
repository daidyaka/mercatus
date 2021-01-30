import React, {Component} from "react";
import AdComponentContainer from "../components/AdComponentContainer";
import AdTypeSelector from "../components/AdTypeSelector";

export default class CreateAd extends Component {

    constructor() {
        super();

        this.state = {
            title: '',
            type: '',
            phoneNumber: ''
        };

        this.elements = [];
        this.createAd = this.createAd.bind(this);
        this.updateElements = this.updateElements.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    createAd() {
        fetch('/profile/create-ad', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                type: this.state.type,
                phoneNumber: this.state.phoneNumber,
                elements: this.elements
            })
        }).then(response => {
            if (response.ok && response.status === 201) {
                window.location = `${response.headers.get('Location')}.html`;
            }
        });
    }

    updateElements(elements) {
        this.elements = elements;
    }

    handleInputChange(event) {
        let target = event.target;
        this.setState({
            [target.name]: target.value
        })
    }

    render() {
        return (
            <>
                <label>
                    Заголовок:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                    Категория объявления:
                    <AdTypeSelector onTypeChange={this.handleInputChange}/>
                </label>
                <label>
                    Номер телефона для связи:
                    <input type="text" name="phoneNumber" value={this.state.phoneNumber}
                           onChange={this.handleInputChange}/>
                </label>
                <hr/>
                <AdComponentContainer updateElements={this.updateElements}/>
                <hr/>
                <button type="button" id="adv-submit" onClick={this.createAd}>Создать</button>
            </>
        )
    }


};