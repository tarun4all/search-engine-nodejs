import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export class Footer extends Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    render() {
        return (
            <footer id="footer">
                <div className="footer">
                    <div className="container h-100">
                        <div className="footer-row">
                            <div className="main-logo"><NavLink to="/">
                                <img src={"/images/logoBlack.png"} alt="logo"/></NavLink>
                            </div>
                            <div className="navigation-menu">
                                <ul>
                                    <li><NavLink exact={true} to="/" activeClassName="active">Home</NavLink></li>
                                    <li><NavLink to="/portfolio" activeClassName="active">Portfolio</NavLink></li>
                                    <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                                    <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                                </ul>
                            </div>
                            <div className="copy-right">All Copyright © Reserved by Chetanya Sagar</div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
