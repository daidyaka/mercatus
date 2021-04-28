import React, {Component} from "react";
import HeaderAuth from "./HeaderAuth";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css';
import {Button, Form, FormControl, Navbar, NavDropdown} from "react-bootstrap";
import Flags from 'country-flag-icons/react/3x2'
import {getParam} from "../services/url-parser";
import i18n from "../services/i18n/i18n";

export default class Header extends Component {

    state = {
        query: getParam('query')
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" className={"mb-4"}>
                <Link to={"/"}><Navbar.Brand className={"site-name"}>Mercatus</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Form inline action="/search" method="get">
                        <FormControl type="text" placeholder="Поиск" name="query" className="search-field"
                                     value={this.state.query}
                                     onChange={ev => this.setState({query: ev.target.value})}/>
                        <Button variant="secondary" type="submit" className="search-btn"><FontAwesomeIcon icon={faSearch}/></Button>
                    </Form>
                    <div className="mr-4"/>
                    <NavDropdown title={i18n.get('language')} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => i18n.setLocale('uk')}><Flags.UA style={{height: '20px'}}/> Українська</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => i18n.setLocale('ru')}><Flags.RU style={{height: '20px'}}/> Русский</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => i18n.setLocale('en')}><Flags.GB style={{height: '20px'}}/> English</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
                <HeaderAuth/>
            </Navbar>
        );
    }
}