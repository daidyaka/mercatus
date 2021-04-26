import React, {Component} from "react";
import ImageArticleComponent from "./ad/ImageArticleComponent";
import YoutubeVideoComponent from "./ad/YoutubeVideoComponent";
import TextArticleComponent from "./ad/TextArticleComponent";

export default class AdComponentHolder extends Component {

    constructor(props) {
        super(props);

        this.elements = props.elements;
        this.userId = props.userId;
    }


    render() {
        return (
            this.elements.map(el => {
                if (el.type === 'text') {
                    return <TextArticleComponent text={el.text}/>
                }

                if (el.type === 'image') {
                    return <ImageArticleComponent imageLink={`http://localhost:8080/media/images/${this.userId + '/' + el.src}`}/>
                }

                if (el.type === 'video') {
                    return <YoutubeVideoComponent videoLink={el.videoLink}/>
                }
            })
        );
    }

}