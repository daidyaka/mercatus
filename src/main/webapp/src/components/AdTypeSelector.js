import React, {Component} from "react";
import types from '../providers/ad-types'
import {Form} from "react-bootstrap";
import i18n from "../services/i18n/i18n";

export default class AdTypeSelector extends Component {

    constructor(props) {
        super(props);

        this.types = types;
        this.onTypeChange = props.onTypeChange;
        this.collectTypes = this.collectTypes.bind(this);
    }

    render() {
        return (
            <>
                <Form.Group>
                    <Form.Control as="select" size="sm" custom name="type" className="input"
                                  onChange={this.onTypeChange}>
                        {this.collectTypes()}
                    </Form.Control>
                </Form.Group>
            </>
        );
    }

    collectTypes() {
        let collectedTypes = [];
        for (const type in this.types) {
            if (this.types[type].name) {
                collectedTypes.push(
                    <optgroup label={this.types[type].name} /*value={type}*/>
                        {Object.entries(this.types[type].options).map(([key, value]) => {
                            return (<option value={key}>{i18n.get(`ad.types.${key}`)}</option>);
                        })}
                    </optgroup>
                );
            } else {
                collectedTypes.push(
                    <option value={type}>
                        {this.types[type]}
                    </option>
                );
            }
        }
        return collectedTypes;
    }
}