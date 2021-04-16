import React, {Component} from "react";

export default class ImageArticleComponent extends Component {

    constructor(props) {
        super(props);

        this.imageLink = props.imageLink;
    }


    render() {
        return (
            <div className={'mt-4'} style={{textAlign: 'center'}}>
                <img src={this.imageLink} alt='Пользовательское изображение'
                     style={{height: 500, objectFit: 'contain'}}/>
            </div>
        );
    }
}