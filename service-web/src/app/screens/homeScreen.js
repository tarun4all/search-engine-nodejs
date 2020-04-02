import React, {Component} from 'react';
import {SearchInput} from "../components/searchInput";
import {Footer} from "../components/Footer";

export class HomeScreen extends Component {
    render() {
        return (
            <div>
                <div className="wrapper-section result-wrapper">
                    <div className="google-search-row">
                        <div className="iner-section">
                            <div className="search-logo">
                                <img src="/images/Logo.png" alt="logo"/>
                            </div>
                            <SearchInput query = {{q:""}}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
