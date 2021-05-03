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
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
};