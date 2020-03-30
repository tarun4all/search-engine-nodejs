import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './style.css'


class FooterComponent extends Component {
    render() {
        return (
            <footer id="footer-section">
                <div className="footer-col-left">
                    <div className="footer-logo">
                        <div className="search-logo">
                            <img src="/images/googlelogo.png" alt="logo"/>
                        </div>
                        <p>The search engine that respects your privacy</p>
                    </div>
                    <div>
                    <ul>
                        <li><a href="">Legal notices</a></li>
                        <li><a href="">Terms of service</a></li>
                        <li><a href="">Legal notices</a></li>
                    </ul>
                </div>
                    <p className="copy-right">© 2020 Qwant. All Rights Reserved.</p>
                </div>
            </footer>
        )
    }
}

export const Footer = withRouter(FooterComponent);
