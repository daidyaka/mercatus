import React, {Component} from "react";

export default class Home extends Component {

    componentDidMount() {
        document.title = 'Paradigme | Сервис объявлений услуг';
    }

    render() {
        return (
            <div className="App">
                Main page
            </div>
        );
    }
};