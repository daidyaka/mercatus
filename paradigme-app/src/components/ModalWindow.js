import React, {Component} from "react";
import '../styles/Modal.css';

export default class ModalWindow extends Component {

    constructor(props) {
        super(props);

        this.onClose = props.onClose;
    }

    render() {
        return (
            <div className={`modal ${this.props.isActive ? 'enabled' : 'disabled'}`} onClick={this.onClose}>
                <div className="modal-content">
                    {this.props.children}
                    {console.log(this.props.children)}
                    {console.log(this.props.isActive)}
                </div>
            </div>
        );
    }

}