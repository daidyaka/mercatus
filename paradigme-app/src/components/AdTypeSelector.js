import React, {Component} from "react";
import types from '../data/ad-types'

export default class AdTypeSelector extends Component {

    constructor(props) {
        super(props);

        this.types = types;
        this.onTypeChange = props.onTypeChange;
        this.collectTypes = this.collectTypes.bind(this);
    }

    render() {
        return (
            <select name="type" className="adv-type-select" onChange={this.onTypeChange}>
                {this.collectTypes()}
            </select>
        );
    }

    collectTypes() {
        let collectedTypes = [];
        for (const type in this.types) {
            if (this.types[type].name) {
                collectedTypes.push(
                    <optgroup label={this.types[type].name} /*value={type}*/>
                        {Object.entries(this.types[type].options).map(([key, value]) => {
                            return (<option value={key}>{value}</option>);
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