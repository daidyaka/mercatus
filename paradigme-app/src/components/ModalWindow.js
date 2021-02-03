import React, {Component} from "react";
import '../styles/Modal.css';

export default class ModalWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: props.isActive
        }

        this.markup = props.markup;
        this.closeModal = this.closeModal.bind(this);

        console.log('log')
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
                    {this.markup}
                </div>
            </div>
        );
    }

}