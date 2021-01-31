import React, {Component} from "react";
import HeaderAuth from "./HeaderAuth";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Link className="header-logo-link" to={"/"}>Paradigme</Link>
                <div className="header-search">
                    <form action="/search" method="get">
                        <input className="header-search__input" placeholder="Какую услугу ищете?" name="query"/>
                        <FontAwesomeIcon icon={faSearch}/>
                    </form>
                </div>
                <HeaderAuth/>
                <div className="header-language">
                    <select className="header-language__select">
                        <option value="ua">Українська</option>
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </header>
        );
    }
}