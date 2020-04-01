import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class ForbiddenErrorComponent extends Component {
    render() {
        return (
            <div className = "error-heading-page">
                <div className="page-title">Some error occured. Please contact the service admin</div>
            </div>
        )
    }
}

export const ForbiddenError = withRouter(ForbiddenErrorComponent);
