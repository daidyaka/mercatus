import React, {Component} from "react";
import AdTypeSelector from "../components/AdTypeSelector";
import {getAllParams, toUrlParams} from '../services/url-parser';
import {withRouter} from "react-router";
import AdSearchElement from "../components/AdSearchElement";
import {Alert, Col, Container, Form, Row} from "react-bootstrap";

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
                <Container>
                    <Row>
                        <Col xs={6}>
                            <AdTypeSelector onTypeChange={this.collectValue}/>
                        </Col>
                        <Col>
                            <Form.Control size="sm" type="text" name="location" placeholder="Город"
                                   value={this.queryParameters?.location}
                                   onChange={this.collectValue}/>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="select" size="sm" custom name="sortType" onChange={this.collectValue}>
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
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Container className="search-results">
                    {this.state.results.length !== 0 ? this.state.results.map(
                        (ad) => {
                            return <Row><AdSearchElement ad={ad}/></Row>;
                        }) : <Alert variant={'danger'} className="mt-2">Результатов не найдено.</Alert>}
                </Container>
            </>
        );
    }

}

export default withRouter(Search);