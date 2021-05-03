import React, {Component} from "react";
import AuthenticationContext from "../providers/AuthenticationContext";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import i18n from "../services/i18n/i18n";

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
                        <h3>{i18n.get('rating.leave')}</h3>
                        <Form.Group>
                            <Form.Label>{i18n.get('rating.mark')}:</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleMarkCounter} name="mark">
                                <option selected={true} value={-1}>{i18n.get('rating.no-mark')}</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{i18n.get('rating.review')}:</Form.Label>
                            <Form.Control as="textarea" rows={3} name="text"/>
                        </Form.Group>
                        <input name="username" type="hidden" value={this.context.auth.user.id}/>
                        <input name="userFullName" type="hidden"
                               value={this.context.auth.user.firstName + ' ' + this.context.auth.user.lastName}/>
                        <Button type="submit" variant={"success"} style={{float: 'right'}}
                                className="mb-4">{i18n.get('send')}</Button>
                    </Form>
                ) : (
                    <div className="mb-4" style={{textAlign: 'center'}}>
                        {i18n.get('rating.no-auth.message')} <Link to="/login">{i18n.get('rating.no-auth.link')}</Link>.
                    </div>
                )}
            </div>
        );
    }

}

LeaveReviewComponent.contextType = AuthenticationContext;

export default LeaveReviewComponent;