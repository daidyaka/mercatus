import React, {Component} from "react";
import AdTypeSelector from "../components/AdTypeSelector";
import {getAllParams, toUrlParams} from '../services/url-parser';
import AdSearchElement from "../components/AdSearchElement";
import {Alert, CardColumns, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from "react-router";
import i18n from "../services/i18n/i18n";

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
        let query = this.queryParameters['query'];
        document.title = i18n.get('search') + ' ' + (!!query ? query : '')
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
                            <Form.Control size="sm" type="text" name="location" placeholder={i18n.get('search.city.label')}
                                          value={this.queryParameters?.location}
                                          onChange={this.collectValue}/>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="select" size="sm" custom name="sortType" onChange={this.collectValue}>
                                    <optgroup label={i18n.get('search.sort.date')}>
                                        <option value="RELEVANCE_ASC">{i18n.get('search.sort.date.asc')}</option>
                                        <option value="RELEVANCE_DESC">{i18n.get('search.sort.date.desc')}</option>
                                    </optgroup>
                                    <optgroup label={i18n.get('search.sort.alphabet')}>
                                        <option value="ALPHABET_ASC">{i18n.get('search.sort.alphabet.asc')}</option>
                                        <option value="ALPHABET_DESC">{i18n.get('search.sort.alphabet.desc')}</option>
                                    </optgroup>
                                    <optgroup label={i18n.get('search.sort.rating')} disabled={true}>
                                        <option value="RATING_ASC">{i18n.get('search.sort.rating.asc')}</option>
                                        <option value="RATING_DESC">{i18n.get('search.sort.rating.desc')}</option>
                                    </optgroup>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Container className="search-results">
                    {this.state.results.length !== 0
                        ? <CardColumns> {this.state.results.map((ad) => <AdSearchElement ad={ad}/>)}</CardColumns>
                        : <Alert variant={'danger'} className="mt-2">{i18n.get('search.no-results')}</Alert>}
                </Container>
            </>
        );
    }

}

export default withRouter(Search);