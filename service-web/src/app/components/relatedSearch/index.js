import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class RelatedSearchComponent extends Component {

    render() {
        let relatedLink = "search?q=" + this.props.keyword + "&page=1";
        return (
            <div>
                <a href = {relatedLink} >{this.props.keyword}</a>
            </div>
        )
    }
}

export const RelatedSearch = withRouter(RelatedSearchComponent);
