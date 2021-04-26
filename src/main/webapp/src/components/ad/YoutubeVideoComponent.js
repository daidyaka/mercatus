import React, {Component} from "react";

export default class YoutubeVideoComponent extends Component {
    constructor(props) {
        super(props);

        this.videoLink = props.videoLink;
    }

    render() {
        return <iframe width='560' height='315' src={`https://www.youtube.com/embed/${this.videoLink}`} frameBorder='0'
                       allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                       allowFullScreen/>
    }

}