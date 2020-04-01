import React, {Component} from 'react';
import {SearchInput} from "../components/searchInput";
import {Footer} from "../components/Footer";

export class HomeScreen extends Component {
    render() {
        return (
            <div className="wrapper-section result-wrapper">
            <div className="google-search-row">
                <div className="iner-section">
                    <div className="search-logo">
                        <img src="/images/googlelogo.png" alt="logo"/>
                    </div>
                    <SearchInput query = {{q:""}}/>
                    <p className="search-des">The search engine that respects your privacy.</p>
                </div>
            </div>
                <Footer/>
            </div>
        )
    }
}
