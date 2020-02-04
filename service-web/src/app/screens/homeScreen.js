import React, {Component} from 'react';
import {ProjectSection} from "../components/projectSection";

export class HomeScreen extends Component {
    render() {
        return (
            <div className="wrapper-section">
            <div className="google-search-row">
                <div className="iner-section">
                    <div className="search-logo">
                        <img src="/images/googlelogo.png" alt="logo"/>
                    </div>
                    <ProjectSection/>
                    <p className="search-des">The search engine that respects your privacy.</p>
                </div>
            </div>
            </div>
        )

    }
}
