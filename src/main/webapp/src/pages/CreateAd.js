import React, {Component} from "react";
import CreateAdComponentContainer from "../components/CreateAdComponentContainer";
import AdTypeSelector from "../components/AdTypeSelector";
import "../styles/CreateAd.css";
import VerticalDelimiter from "../components/VerticalDelimiter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneAlt, faSave} from "@fortawesome/free-solid-svg-icons";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import i18n from "../services/i18n/i18n";
import network from "../services/network/network";

export default class CreateAd extends Component {

    componentDidMount() {
        document.title = i18n.get('ad.create')
    }

    constructor() {
        super();

        this.state = {
            title: '',
            type: 'construction',
            phoneNumber: '',
            imageUrl: null
        };

        this.elements = [];
        this.createAd = this.createAd.bind(this);
        this.updateElements = this.updateElements.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateImageUrl = (close, event) => {
        let newValue = event.target.getAttribute('filename');
        this.setState({imageUrl: newValue})
        close();
    }

    createAd(event) {
        network.sendForm('/profile/create-ad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.state.title,
                    type: this.state.type,
                    phoneNumber: this.state.phoneNumber,
                    elements: this.elements,
                    imageUrl: this.state.imageUrl
                })
            },
            event,
            response => {
                if (response.ok) {
                    window.location = `${response.headers.get('location')}.html`;
                }
            }
        );
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
                <Row className="create-ad-header">
                    <Col>
                        <Form.Control size="sm" type="text" name="title" placeholder={i18n.get('ad.header')}
                                      value={this.state.title}
                                      onChange={this.handleInputChange}/>
                    </Col>
                    <AdTypeSelector onTypeChange={this.handleInputChange}/>
                    <Col xs={3}>
                        <InputGroup size={"sm"}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <FontAwesomeIcon icon={faPhoneAlt}/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control size="sm" type="text" name="phoneNumber"
                                          placeholder={i18n.get('ad.phone-number')}
                                          value={this.state.phoneNumber}
                                          onChange={this.handleInputChange}/>
                        </InputGroup>
                    </Col>
                </Row>
                <hr/>
                <CreateAdComponentContainer updateElements={this.updateElements}
                                            updateImageUrl={this.updateImageUrl}
                                            mainImage={this.state.imageUrl}
                                            createButton={
                                                <>
                                                    <VerticalDelimiter/>
                                                    <Button variant={"success"} type="button"
                                                            onClick={this.createAd}>
                                                        <FontAwesomeIcon icon={faSave}/> {i18n.get('create')}
                                                    </Button>
                                                </>
                                            }/>
            </div>
        )
    }


};