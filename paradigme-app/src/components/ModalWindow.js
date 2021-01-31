import React, {Component} from "react";
import '../styles/Modal.css';

export default class ModalWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: props.isActive
        }

        this.text = props.text;
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({
            isActive: false
        })
    }

    render() {
        return (
            <div className="modal" style={{display: this.state.isActive ? 'block' : 'none'}} onClick={this.closeModal}>
                <div className="modal-content">
                    <span className="close" onClick={this.closeModal}>&times;</span>
                    <p>{this.text}</p>
                </div>
            </div>
        );
    }

}