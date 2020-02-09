import React, {Component} from 'react';
import {withRouter, Redirect} from "react-router-dom";


class SearchInputComponent extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        // if(!props.query) props.query = {};
        this.state = {
            buttonClicked : props.buttonClicked,
            // searchKeyword : "",
            url : "",
            searchKeyword : props.query.q,
            pageNum : props.query.page,
        };
        console.log('search keyword', this.state.searchKeyword);
        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onTodoChange(value){
        this.setState({
             searchKeyword: value
        });
    }

    handleKeyPress(ev){
        if(ev.key === "Enter") this.search()
    }

    search(){
        if(this.state.searchKeyword)
        {
            this.setState({url : "/search?q=" + this.state.searchKeyword})
            this.render();
        }        
    }

    render() {
        if(this.state.url){
            return <Redirect to ={this.state.url} />
        }
        return (
            <div className="search-bar">
                <input className="text-field" value = {this.state.searchKeyword} id="keyword" type="search"  onChange={e => this.onTodoChange(e.target.value)} onKeyPress={this.handleKeyPress}/>
                <div className="search-icon"><img src="/images/search.svg" alt="Search Icon" onClick = {this.search}/></div>
            </div>
        )
    }
}

export const SearchInput = withRouter(SearchInputComponent);
