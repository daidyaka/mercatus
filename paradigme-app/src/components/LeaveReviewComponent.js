import React, {Component} from "react";
import AuthenticationContext from "../providers/AuthenticationContext";
import {Button, Form} from "react-bootstrap";

class LeaveReviewComponent extends Component {

    constructor(props) {
        super(props);

        this.ad = props.ad;

        this.state = {
            mark: 5
        }

        this.handleMarkCounter = this.handleMarkCounter.bind(this);
    }

    handleMarkCounter({target}) {
        if (target.value <= 5 && target.value >= 1) {
            this.setState({
                mark: target.value
            })
        }
    }

    render() {
        return (
            <div>
                {this.context.auth.user ? (
                    <Form action={`/ad/${this.ad.url}/review`} method="post">
                        <h3>Оставить отзыв</h3>
                        <Form.Group>
                            <Form.Label>Оценка:</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleMarkCounter} name="mark">
                                <option selected={true} value={-1}>Без оценки</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Отзыв:</Form.Label>
                            <Form.Control as="textarea" rows={3} name="text"/>
                        </Form.Group>
                        <input name="username" type="hidden" value={this.context.auth.user.id}/>
                        <input name="userFullName" type="hidden"
                               value={this.context.auth.user.firstName + ' ' + this.context.auth.user.lastName}/>
                        <Button type="submit" variant={"success"} style={{float: 'right'}}
                                className="mb-4">Отправить</Button>
                    </Form>
                ) : (<></>)}
            </div>
        );
    }

}

LeaveReviewComponent.contextType = AuthenticationContext;

export default LeaveReviewComponent;