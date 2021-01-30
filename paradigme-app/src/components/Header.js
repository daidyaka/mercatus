import React, {Component} from "react";
import HeaderAuth from "./HeaderAuth";
import {Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Link className="header-logo" to={"/"}>Paradigme</Link>
                <div className="header-search">
                    <form action="/search" method="get">
                        <input className="header-search__input" placeholder="Какую услугу ищете?" name="query"/>
                        <input type="submit" className="header-search__btn" value="Я найду!"/>
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