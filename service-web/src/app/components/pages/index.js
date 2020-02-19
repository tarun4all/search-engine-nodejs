import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class PagesComponent extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        // console.log('page props',this.props);
        if(this.props.index===parseInt(this.props.currPage))
            return(
                <li className="page-item active">
                    <span className="page-link"> {this.props.index}
                    </span>
                </li>
            );
        else
        return(
            <li className="page-item page-link" onClick = {()=>this.props.onPageChange(this.props.index)}>
                {this.props.index}
            </li>
        )
    }
}
export const Pages = withRouter(PagesComponent);
