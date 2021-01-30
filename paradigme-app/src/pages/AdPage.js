import React, {Component} from "react";
import {withRouter} from "react-router";
import AdComponentHolder from "../components/AdComponentHolder";

class AdPage extends Component {

    constructor(props) {
        super(props);

        this.title = props.match.params.title;
        this.state = {}
    }

    componentDidMount() {
        fetch(`/ad/${this.title}`).then(response => {
            if (response.status === 200) {
                response.json()
                    .then(loadedAd => {
                        this.setState(loadedAd);
                    })
            } else {
                location.href = '/404';
            }
        })
    }

    render() {
        let ad = this.state.ad;
        let averageReviewMark = this.state.averageReviewMark;

        return (
            ad ? (
                <>
                    <h1>{ad.title}</h1>
                    <h2>Средняя оценка: {averageReviewMark}</h2>
                    <i data-ad-type={ad.type}/>
                    <b>{ad.phoneNumber}</b>
                    <hr/>
                    <AdComponentHolder ad={ad}/>
                    {/*<div th:each="el: ${ad.elements}">*/}
                    {/*    [(${el.markup()})]*/}
                    {/*</div>*/}
                    {/*<h3>Отзывы:</h3>*/}
                    {/*<div className="ad-review" th:each="review: ${ad.reviews}">*/}
                    {/*    <hr>*/}
                    {/*        <p th:text="${review.userFullName}"></p>*/}
                    {/*        <p>Оценка: <b>[(${review.mark})]</b></p>*/}
                    {/*        <p th:if="${review.text != null && review.text.length != 0}"*/}
                    {/*           th:text="${'Комментарий: ' + review.text}"></p>*/}
                    {/*</div>*/}
                    {/*<hr>*/}
                    {/*    <form th:action="@{/ad/{adUrl}/review(adUrl=${ad.url})}" method="post" th:if="${user != null}">*/}
                    {/*        <label>*/}
                    {/*            Оценка:*/}
                    {/*            <input type="number" min="1" max="5" value="5" name="mark">*/}
                    {/*        </label>*/}
                    {/*        <label>*/}
                    {/*            Отзыв:*/}
                    {/*            <textarea name="text" placeholder="Необязательно"></textarea>*/}
                    {/*        </label>*/}
                    {/*        <input name="username" type="hidden" th:value="${user.getId()}">*/}
                    {/*            <input name="userFullName" type="hidden"*/}
                    {/*                   th:value="${user.getFirstName() + ' ' + user.getLastName()}">*/}
                    {/*                <input type="submit" value="Отправить">*/}
                    {/*    </form>*/}
                </>
            ) : (
                <p>
                    Loading...
                </p>
            )

        );
    }

}

export default withRouter(AdPage);