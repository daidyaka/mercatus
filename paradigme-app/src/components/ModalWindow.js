import React, {Component} from "react";
import '../styles/Modal.css';

export default class ModalWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: props.isActive
        }

        this.onClose = this.onClose.bind(this);
        this.onCloseAdditionalFunc = props.onClose;
    }

    onClose() {
        if (this.onCloseAdditionalFunc) {
            this.onCloseAdditionalFunc();
        }

        this.setState({
            isActive: false
        })
    }

    render() {
        return (
            <div className={`modal ${this.state.isActive ? 'enabled' : 'disabled'}`}
                 onClick={this.onClose}>

                <div className="modal-content">
                    {this.props.children}
                </div>
            </div>
        );
    }

}