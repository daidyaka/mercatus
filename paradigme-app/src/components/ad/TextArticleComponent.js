import React, {Component} from "react";

export default class TextArticleComponent extends Component {

    constructor(props) {
        super(props);

        this.text = props.text;
    }

    render() {
        return <p>{this.text}</p>
    }
}