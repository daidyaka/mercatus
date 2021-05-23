import React, {Component} from 'react';
import i18n from "../services/i18n/i18n";

export default class Forbidden extends Component {

    componentDidMount() {
        document.title = i18n.get('403.title');
    }

    render() {
        return (
            <>
                <h1>403</h1>
                <h2>{i18n.get('403.message.main')}</h2>
                <h3>{i18n.get('403.message.secondary')}</h3>
            </>
        )
    }

}