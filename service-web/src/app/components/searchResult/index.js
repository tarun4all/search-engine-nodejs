import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class SearchResultComponent extends Component {
    constructor(props){
        console.log(props);
        super(props);
        this.state = {
            dataObj:props.result,
        };
        // console.log(this.state.dataObj);
    }

    render() {
        return (
            <div className="content-row">
                <div className="heading-title">
                    <a href={this.state.dataObj.link}>
                        <div className="link-title">{this.state.dataObj.title}</div>
                        {/*<span>{this.state.dataObj.displayed_link}</span>*/}
                    </a>
                </div>
                <div className="description">
                    {this.state.dataObj.snippet}
                </div>
            </div>
        )
    }
}

export const SearchResult = withRouter(SearchResultComponent);
