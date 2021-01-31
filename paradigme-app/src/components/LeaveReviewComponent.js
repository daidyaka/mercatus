import React, {Component} from "react";
import AuthenticationContext from "../providers/AuthenticationContext";

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
                    <form action={`/ad/${this.ad.url}/review`} method="post">
                        <label>
                            Оценка:
                            <input type="number" min="1" max="5" value={this.state.mark} name="mark"
                                   onChange={this.handleMarkCounter}/>
                        </label>
                        <label>
                            Отзыв:
                            <textarea name="text" placeholder="Необязательно"/>
                        </label>
                        <input name="username" type="hidden" value={this.context.auth.user.id}/>
                        <input name="userFullName" type="hidden"
                               value={this.context.auth.user.firstName + ' ' + this.context.auth.user.lastName}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                ) : (<></>)}
            </div>
        );
    }

}

LeaveReviewComponent.contextType = AuthenticationContext;

export default LeaveReviewComponent;