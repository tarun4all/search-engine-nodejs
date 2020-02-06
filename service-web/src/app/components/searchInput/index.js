import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class SearchInputComponent extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            searchKeyword: props,
        };
        console.log('search keyword', this.state.searchKeyword);
    }

    render() {
        return (
            <div className="search-bar">
                <input className="text-field" placeholder="" id="" type="search"/>
                {console.log('keyword', this.state.searchKeyword)}
                <div className="search-icon"><img src="/images/search.svg" alt="Search Icon"/></div>
            </div>
        )
    }
}

export const SearchInput = withRouter(SearchInputComponent);
