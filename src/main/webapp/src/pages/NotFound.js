import React, {Component} from 'react';

export default class NotFound extends Component {

    componentDidMount() {
        document.title = 'Страница не найдена';
    }

    render() {
        return (
            <>
                <h1>404</h1>
                <h2>Ресур не был найден ¯\_(ツ)_/¯</h2>
                <h3>Проверьте правильно ли указана ссылка на него.</h3>
            </>
        )
    }

}