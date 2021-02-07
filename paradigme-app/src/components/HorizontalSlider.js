import React, {Component} from "react";
import "../styles/HorizontalSlider.css";

export default class HorizontalSlider extends Component {

    constructor(props) {
        super(props);

        this.numberOfElements = props.numberOfElements;

        this.state = {
            index: 0,
            leftBtnActive: false,
            rightBtnActive: this.props.children.length - this.numberOfElements
        }

        this.getItems = this.getItems.bind(this);
        this.leftClick = this.leftClick.bind(this);
        this.rightClick = this.rightClick.bind(this);

        this.state.items = this.getItems();
    }

    getItems() {
        let items = [];
        let i = 0;
        while (i < this.numberOfElements) {
            items.push(this.props.children[this.state.index + i]);
            i++;
        }
        items.forEach(it => console.log(it.props.title));
        console.log('--------------')
        return items;
    }

    leftClick() {
        const newIndex = this.state.index - 1;
        if (this.state.index !== 0 && newIndex <= this.props.children.length - this.numberOfElements) {
            this.setState({
                index: newIndex,
                rightBtnActive: true
            })
        } else {
            this.setState({
                leftBtnActive: false
            })
        }
    }

    rightClick() {
        const newIndex = this.state.index + 1;
        if (newIndex <= this.props.children.length - this.numberOfElements) {
            this.setState({
                index: newIndex,
                leftBtnActive: true
            })
        } else {
            this.setState({
                rightBtnActive: false
            })
        }
    }

    render() {
        return (
            <div className="horizontal-slider">
                <button type="button" className="horizontal-slider-control"
                        disabled={!this.state.leftBtnActive}
                        onClick={this.state.leftBtnActive ? this.leftClick : () => {
                        }}>&larr;</button>
                {this.state.items}
                <button type="button" className="horizontal-slider-control"
                        disabled={!this.state.rightBtnActive}
                        onClick={this.state.rightBtnActive ? this.rightClick : () => {
                        }}>&rarr;</button>
            </div>
        );
    }

}