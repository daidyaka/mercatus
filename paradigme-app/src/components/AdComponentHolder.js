import React, {Component} from "react";
import ImageArticleComponent from "./article/ImageArticleComponent";
import YoutubeVideoComponent from "./article/YoutubeVideoComponent";
import TextArticleComponent from "./article/TextArticleComponent";

export default class AdComponentHolder extends Component {

    constructor(props) {
        super(props);

        this.ad = props.ad;
    }


    render() {
        return (
            this.ad.elements.map(el => {
                if (el.type === 'text') {
                    return <TextArticleComponent text={el.text}/>
                }

                if (el.type === 'image') {
                    return <ImageArticleComponent imageLink={`http://localhost:8080/media/images/${this.ad.userId + '/' + el.src}.jpg`}/>
                }

                if (el.type === 'video') {
                    return <YoutubeVideoComponent videoLink={el.videoLink}/>
                }
            })
        );
    }

}