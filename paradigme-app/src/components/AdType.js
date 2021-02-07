import React, {Component} from "react";
import types from '../data/ad-types'

export default class AdType extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.type
        }
    }

    componentDidMount() {
        this.setState({
            type: this.convertTypeToText()
        })
    }

    render() {
        return <i>{this.state.type}</i>
    }

    convertTypeToText() {
        let value = this.state.type;
        for (const type in types) {
            if (types[type].name) {
                for (const [key, elVal] of Object.entries(types[type].options)) {
                    if (key === value) {
                        return types[type].name + ' > ' + elVal;
                    }
                }
            } else {
                if (value === type) {
                    return types[type];
                }
            }
        }
        return 'Другое';
    }
}