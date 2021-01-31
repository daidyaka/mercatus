import React, {Component} from "react";
import AdTypeSelector from "../components/AdTypeSelector";
import {getAllParams, toUrlParams} from '../services/url-parser';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            results: []
        }

        this.props = props;
        this.queryParameters = getAllParams();

        this.fetchData = this.fetchData.bind(this);
        this.collectValue = this.collectValue.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let url = '/search?' + toUrlParams(this.queryParameters);
        this.props.history.push(url);
        fetch(url).then(response => {
            if (response.status === 200) {
                response.json().then(
                    res => this.setState({
                        results: res
                    })
                )
            }
        })
    }

    collectValue({target}) {
        this.queryParameters[target.name] = target.value;
        this.fetchData();
    }

    render() {
        return (
            <>
                Сортировать:
                <select name="sortType" onChange={this.collectValue}>
                    <optgroup label="по дате">
                        <option value="RELEVANCE_ASC">по убыванию</option>
                        <option value="RELEVANCE_DESC">по возрастанию</option>
                    </optgroup>
                    <optgroup label="по алфавиту">
                        <option value="ALPHABET_ASC">по убыванию</option>
                        <option value="ALPHABET_DESC">по возрастанию</option>
                    </optgroup>
                    <optgroup label="по рейтингу (отключено)" disabled={true}>
                        <option value="RATING_ASC">по убыванию</option>
                        <option value="RATING_DESC">по возрастанию</option>
                    </optgroup>
                </select>
                <input type="text" name="location" placeholder="Город" value={this.queryParameters?.location}
                       onChange={this.collectValue}/>
                <AdTypeSelector onTypeChange={this.collectValue}/>
                <div className="search-results">
                    {this.state.results.length !== 0 ? this.state.results.map((res, index) => {
                        return (
                            <div>
                                {index + 1}. <Link to={`/ad/${res.url}`}>{res.title}</Link>
                            </div>
                        );
                    }) : 'Результатов не найдено :('}
                </div>
            </>
        );
    }

}

export default withRouter(Search);