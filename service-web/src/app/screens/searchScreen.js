import React, {Component} from 'react';


import {SearchInput} from "../components/searchInput";
import {PaginationBar} from "../components/paginationBar";
import {SearchResult} from "../components/searchResult";
import {Placeholder} from "../components/searchResultPlaceholder";
// import  { Redirect } from 'react-router-dom'
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
        let getUrl = "http://localhost:3000/search?search=" + keyword;
        this.props.history.push(url);
        // this.forceUpdate();
        this.setState({isLoaded:false, data:[]});

        // console.log('getURL ',getUrl);
        this.getSearchResults(getUrl);
        // console.log('data', this.state.data);


    }

    componentWillMount() {
        if(!this.state.params.q) this.props.history.replace('/');
        else this.genSearchUrl();
    }

    genSearchUrl() {
        let tempParam = {};
        tempParam.q=this.state.params.q || "";
        if(Number.isInteger(this.state.params.page)) tempParam.page = this.state.params.page;
        else tempParam.page = 1;
        this.setState({params:tempParam});

        let url = "http://localhost:3000/search?search="  + this.state.params.q ;//+ "&page=" + this.state.params.page;
        // console.log('url',url);
        this.getSearchResults(url);
    }

    getSearchResults(url){
        console.log('getSearchResults called');
        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                    console.log('data', this.state.data);
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
                        this.state.data.organic_results.map((searchResult) => <SearchResult result = {searchResult} key = {searchResult.position}/>) :
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
