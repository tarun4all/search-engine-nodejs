import React, {Component} from 'react';


import {SearchInput} from "../components/searchInput";
import {PaginationBar} from "../components/paginationBar";
import {SearchResult} from "../components/searchResult";
import {Placeholder} from "../components/searchResultPlaceholder";
import  { Redirect } from 'react-router-dom'
import queryString from 'query-string';

export class SearchScreen extends Component {
    constructor(props) {
        super(props);
        let params =  queryString.parse(this.props.location.search);
        console.log('params',params);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            params:params,
        };
    }

    onSearch(keyword)
    {
        console.log('button clicked',keyword);
        let url = "?q=" + keyword;
        // console.log('this',this);
        // this.getSearchResults(url);
        this.props.history.push(url);
        // this.render();
    }

    componentWillMount() {
        this.genSearchUrl();
    }

    genSearchUrl() {
        let query = this.state.params.q || "";
        let pageNum;
        if(Number.isInteger(this.state.params.page)) pageNum = this.state.params.page;
        else pageNum = 1;
        let url = "http://localhost:3000/search?search=" + query + "&page=" + pageNum;
        console.log('url',url);
        this.getSearchResults(url);
    }

    getSearchResults(url){
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
                    //TODO handle error
                    // alert('error');
                    this.setState({
                        error: true,
                    });
                }
            )
    }


    render() {
        if(!this.state.params.q) return <Redirect to = "/" />

        console.log('data', this.state.data);
        return (
            <div>
                <div className="search-result-header clearfix">
                    <a href = "/" ><img src="images/googlelogo.png" className="header-logo"/></a>
                    <div className="search-header">
                        <SearchInput buttonClick={this.onSearch.bind(this)} query={this.state.params}/>
                        {/* <button className ="btn-primary" onClick ={this.onSearch}>this</button> */}
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
                            <PaginationBar/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
