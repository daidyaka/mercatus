import React, {Component} from "react";

export default class TextArticleComponent extends Component {

    constructor(props) {
        super(props);

        this.text = props.text;
    }

    render() {
        return <div dangerouslySetInnerHTML={{__html: this.text}}/>
    }
}