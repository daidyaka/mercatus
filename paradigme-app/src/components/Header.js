import React, {Component} from "react";
import HeaderAuth from "./HeaderAuth";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css';
import {Button, Form, FormControl, Navbar, NavDropdown} from "react-bootstrap";
import Flags from 'country-flag-icons/react/3x2'

export default class Header extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" className={"mb-4"}>
                <Link to={"/"}><Navbar.Brand className={"site-name"}>Paradigme</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Form inline action="/search" method="get">
                        <FormControl type="text" placeholder="Поиск" className="search-field"/>
                        <Button variant="secondary" className="search-btn"><FontAwesomeIcon icon={faSearch}/></Button>
                    </Form>
                    <div className="mr-4"/>
                    <NavDropdown title="Язык" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#ua"><Flags.UA style={{height: '20px'}}/> Українська</NavDropdown.Item>
                        <NavDropdown.Item href="#ru" selected><Flags.RU
                            style={{height: '20px'}}/> Русский</NavDropdown.Item>
                        <NavDropdown.Item href="#en"><Flags.GB style={{height: '20px'}}/> English</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
                <HeaderAuth/>
            </Navbar>
        );
    }
}