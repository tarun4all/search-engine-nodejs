import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
// Ensure environment variables are read.


class SearchInputComponent extends Component {
    constructor(props) {
        // console.log(props);
        super(props);

        // if(!props.query) props.query = {};
        this.state = {
            buttonClicked : props.buttonClick,
            searchKeyword : props.q,
            pageNum : props.page,
        };
        // console.log('search keyword', this.state.searchKeyword);
        this.onSearch = this.onSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    buttonClick(keyword) {
        let url = "/search?q=" + keyword;
        window.location.assign(url);
    }

    onTodoChange(value) {
        this.setState({
             searchKeyword: value
        });
    }

    onSearch() {
        if(!this.state.searchKeyword) return "";
        let keyword = encodeURIComponent(this.state.searchKeyword);
        // console.log(keyword);
        if(typeof(this.state.buttonClicked)=='function') this.state.buttonClicked(keyword);
        else this.buttonClick(keyword);
        // this.buttonClick(this.state.searchKeyword);
    }

    handleKeyPress(ev) {
        if(ev.key === "Enter") this.onSearch();
    }

    // search(){
        // if(this.state.searchKeyword)
        // {
        //     this.setState({url : "/search?q=" + this.state.searchKeyword})
        //     this.render();
        // }
    // }

    render() {
        // if(this.state.url){
        //     return <Redirect to ={this.state.url} />
        // }
        return (
            <div className="search-bar">
                <input className="text-field" value = {this.state.searchKeyword} id="keyword" type="search"  onChange={e => this.onTodoChange(e.target.value)}  onKeyPress={this.handleKeyPress}/>
                <div className="search-icon"><img src="/images/search.svg" alt="Search Icon" onClick = {this.onSearch}/></div>
            </div>
        )
    }
}

export const SearchInput = withRouter(SearchInputComponent);
