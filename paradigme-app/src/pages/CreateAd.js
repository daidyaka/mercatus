import React, {Component} from "react";
import CreateAdComponentContainer from "../components/CreateAdComponentContainer";
import AdTypeSelector from "../components/AdTypeSelector";
import "../styles/CreateAd.css";
import VerticalDelimiter from "../components/VerticalDelimiter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";

export default class CreateAd extends Component {

    constructor() {
        super();

        this.state = {
            title: '',
            type: 'construction',
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
                elements: this.elements,
                imageUrl: null
            })
        }).then(response => {
            if (response.ok) {
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
            <div className="margin-header">
                <div className="create-ad-header">
                    <label>
                        <span>Заголовок:</span>
                        <input className="input" type="text" name="title" value={this.state.title}
                               onChange={this.handleInputChange}/>
                    </label>
                    <AdTypeSelector onTypeChange={this.handleInputChange}/>
                    <label>
                        <span>Номер телефона для связи:</span>
                        <input className="input" type="text" name="phoneNumber" value={this.state.phoneNumber}
                               onChange={this.handleInputChange}/>
                    </label>
                </div>
                <hr/>
                <CreateAdComponentContainer updateElements={this.updateElements}
                                            createButton={
                                                <>
                                                    <VerticalDelimiter/>
                                                    <Button variant={"success"} type="button"
                                                            onClick={this.createAd}>
                                                        <FontAwesomeIcon icon={faSave}/> Создать
                                                    </Button>
                                                </>
                                            }/>
            </div>
        )
    }


};