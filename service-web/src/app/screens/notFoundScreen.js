import React, {Component} from 'react';

export class NotFoundScreen extends Component {
    render() {
        console.log('not found');
        return (
            <div className = "error-heading-page">
               <div className="page-title">404 page not found</div>
            </div>
        )
    }
}
