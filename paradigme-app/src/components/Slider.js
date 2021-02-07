import React, {Component} from "react";
import "../styles/HorizontalSlider.css";
import ScrollContainer from "react-indiana-drag-scroll";

export default class Slider extends Component {

    constructor(props) {
        super(props);

        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = undefined;
    }


    sliceChildren(array) {
        let chunk = 4;
        let i = 0;
        let j = 0;
        let tempArray = [];
        while (array.length) {
            if (i === chunk) {
                i = 0;
                j++;
            }
            let ar = tempArray[j];
            if (ar === undefined || ar.length === 0) {
                ar = [];
            }
            ar.push(array.pop());
            tempArray[j] = ar;
            i++;
        }
        return tempArray;
    }

    render() {
        return (
            <div className="slider">
                {this.props.withScroll ? (
                    <ScrollContainer hideScrollbars={false} className="slider-scroll-container">
                        {this.props.children.map(el => {
                            return <div className="slider-scroll-container__el">{el}</div>
                        })}
                    </ScrollContainer>
                ) : (
                    <div className="slider-grid-container">
                        {this.sliceChildren(this.props.children).map(elements => {
                            return <div className="slider-grid-container__row">
                                {elements}
                            </div>
                        })}
                    </div>
                )}
            </div>
        );
    }

}