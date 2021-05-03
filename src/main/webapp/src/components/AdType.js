import React, {Component} from "react";
import i18n from "../services/i18n/i18n";

export default class AdType extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.type
        }
    }

    render() {
        return <i>{i18n.get(`ad.types.${this.state.type}`)}</i>;
    }
}