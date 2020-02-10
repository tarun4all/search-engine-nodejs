import React, {Component} from 'react';
import {SearchInput} from "../components/searchInput";

export class HomeScreen extends Component {
    render() {
        //TODO fix searchInput component to be able to search from here
        return (
            <div className="wrapper-section">
            <div className="google-search-row">
                <div className="iner-section">
                    <div className="search-logo">
                        <img src="/images/googlelogo.png" alt="logo"/>
                    </div>
                    {/*<ProjectSection/>*/}
                    <SearchInput query = {{q:""}}/>
                    <p className="search-des">The search engine that respects your privacy.</p>
                </div>
            </div>
            </div>
        )
    }
}
