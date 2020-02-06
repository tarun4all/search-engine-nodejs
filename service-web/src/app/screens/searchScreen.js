import React, {Component} from 'react';
import {ProjectSection} from "../components/projectSection";
import {SearchResult} from "../components/searchResult";
import {Placeholder} from "../components/searchResultPlaceholder";
// import config from "../config";


export class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentWillMount() {
        this.getSearchResults();
    }

    getSearchResults() {
        const url = "http://localhost:3000/search?search=pizza&page=1";
        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        console.log('search', this.state.data)
        return (
            <div>
                <div className="search-result-header clearfix">
                    <img src="images/googlelogo.png" className="header-logo"/>
                    <div className="search-header">
                        <ProjectSection search =  ""  />
                        {/*this.state.data[0].keyword?this.state.data[0].keyword:""*/}
                        {/*{this.state.data[0].keyword?this.state.data.pop():""}*/}
                    </div>
                </div>
                <section className="wrapper-section result-wrapper">
                    {this.state.isLoaded ?
                        this.state.data.map((searchResult) => <SearchResult result = {searchResult} />) :
                        (
                            <>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            <Placeholder/>
                            </>
                        )
                    }
                    <div className="left-content">

                        <div className="pagination-section">
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className="page-item disabled">
                                        <span className="page-link">Previous</span>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item active">
                                      <span className="page-link">
                                        2
                                        <span className="sr-only">(current)</span>
                                      </span>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
