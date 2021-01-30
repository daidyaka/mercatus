import React, {Component} from "react";

export default class ImageArticleComponent extends Component {

    constructor(props) {
        super(props);

        this.imageLink = props.imageLink;
    }


    render() {
        return <img src={this.imageLink} alt='Пользовательское изображение'/>
    }
}