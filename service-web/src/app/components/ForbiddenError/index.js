import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class ForbiddenErrorComponent extends Component {
    render() {
        return (
            <div className = "error-heading-page">
                <div className="page-title">403 Forbidden</div>
            </div>
        )
    }
}

export const ForbiddenError = withRouter(ForbiddenErrorComponent);
