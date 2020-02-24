import React, {Component} from 'react';

import {SearchInput} from "../components/searchInput";
import {SearchResult} from "../components/searchResult";
import {Placeholder} from "../components/searchResultPlaceholder";
import {TwitterTweetEmbed} from 'react-twitter-embed';
import {Pages} from "../components/pages";
import queryString from 'query-string';

export class SearchScreen extends Component {
    constructor(props) {
        super(props);
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        params.page = params.page ? params.page : 1;
        params.q = params.q ? params.q : "";
        const TOTAL_PAGE = 5;
        let lastPage = TOTAL_PAGE + parseInt(params.page);

        // console.log('params',params);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            q: params.q,
            page: params.page,
            backendUrl: "http://localhost:3000/api/search?search=",
            lastPage: lastPage,
            totalPage: TOTAL_PAGE,
        };
    }

    onSearch(keyword) {
        this.setState({q: keyword}, function () {
            this.onPageChange(1)
        })

    }

    search(keyword, page) {
        let url = "?q=" + keyword + "&page=" + page;
        let getUrl = this.state.backendUrl + keyword + "&page=" + page;
        this.props.history.push(url);
        this.setState({isLoaded: false, data: []});

        // console.log('getURL ',getUrl);
        this.getSearchResults(getUrl);
        // console.log('data', this.state.data);
    }

    onPageChange(page) {
        let lastPage = parseInt(this.state.totalPage) + parseInt(page);
        console.log('lastpage ',lastPage);
        this.setState({
            lastPage: lastPage,
            page: page,
        }, function () {
            this.search(this.state.q, page);
        });
    }

    addClassOnFocus(){
        let v = document.getElementById("searchHeader");
        v.classList.add("on-focus");
        document.querySelector('body').classList.add('onfocus-body');
    }

    removeClassOnBlur(){
        let v = document.getElementById("searchHeader");
        v.classList.remove("on-focus");
        document.querySelector('body').classList.remove('onfocus-body');
    }

    componentWillMount() {
        if (!this.state.q) this.props.history.replace('/');
        else this.genSearchUrl();
    }

    genSearchUrl() {
        // console.log('params', this.state.params);
        let url = this.state.backendUrl + this.state.q + "&page=" + this.state.page;
        this.getSearchResults(url);
    }

    getSearchResults(url) {
        // console.log('getSearchResults called');
        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                    // console.log('data', this.state.data);
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //TODO handle error
                    // alert('error');
                    console.log('error ', error);
                    this.setState({
                        error: true,
                    });
                }
            )
    }


    render() {
        let pages = [], i = this.state.page, len = this.state.lastPage;
        while (i < len) pages.push(i++);

        // console.log('Len', len);
        // console.log(this.state);
        return (
            <div>
                <div className="search-result-header clearfix">
                    <a href="/" className="logo-google"><img src="images/googlelogo.png" className="header-logo" alt = "logo"/></a>
                    <div className="search-header" id = "searchHeader">
                        <i className="backArrow"><img src="images/back-arrow.jpg"/></i>
                        <SearchInput buttonClick={this.onSearch.bind(this)} q={this.state.q} page={this.state.page} addClass = {this.addClassOnFocus.bind(this)} removeClass = {this.removeClassOnBlur.bind(this)}/>
                        {/* <button className ="btn-primary" onClick ={this.onSearch}>this</button> */}
                    </div>
                </div>
                <section className="wrapper-section result-wrapper">
                <section className="inner-content">
                    <div className="content-main">
                    {this.state.isLoaded ?
                        this.state.data.organic_results.map((searchResult) => <SearchResult result={searchResult}
                                                                                            key={searchResult.position}/>) :
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
                        {this.state.isLoaded ?
                            (
                                <div className="left-content">
                                    <div className="pagination-section">
                                        <nav aria-label="...">
                                            <ul className="pagination">
                                                {pages.map((i) => <Pages key={i} index={i} currPage={this.state.page}
                                                                         onPageChange={this.onPageChange.bind(this)}/>)}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            ) : ""
                        }
                    </div>

                    {this.state.isLoaded && this.state.data.social ?
                    <div className="socials">
                        <div className="social-heading">Social</div>
                        {this.state.data.social.tweets.map(tweetIds =>
                            <div className="tweets">
                                <TwitterTweetEmbed key={tweetIds} tweetId={tweetIds}/></div>
                        )}
                    </div>
                     : ""
                    }
                </section>
                </section>
            </div>
        )
    }
}
