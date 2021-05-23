import React, {Component} from "react";
import {Carousel} from "react-bootstrap";
import i18n from "../services/i18n/i18n";

export default class Home extends Component {

    componentDidMount() {
        document.title = i18n.get('siteName');
    }

    render() {
        return (
            <div className="App">
                <Carousel>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src="images/remont.jpg"
                            alt="First slide"
                            height={400}
                            style={{objectFit: 'cover'}}
                        />
                        <Carousel.Caption style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <h3>{i18n.get('intro.first.title')}</h3>
                            <p>{i18n.get('intro.first.description')}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src="images/perevozki.jpg"
                            alt="Second slide"
                            height={400}
                            style={{objectFit: 'cover'}}
                        />
                        <Carousel.Caption style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <h3>{i18n.get('intro.second.title')}</h3>
                            <p>{i18n.get('intro.second.description')}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src="images/it_uslugi.jpg"
                            height={400}
                            alt="Third slide"
                            style={{objectFit: 'cover'}}
                        />
                        <Carousel.Caption style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <h3>{i18n.get('intro.third.title')}</h3>
                            <p>{i18n.get('intro.third.description')}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
};