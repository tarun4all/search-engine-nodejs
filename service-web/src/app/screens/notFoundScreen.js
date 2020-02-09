import React, {Component} from 'react';

export class NotFoundScreen extends Component {
    render() {
        console.log('not found');
        return (
            <div className = "flow">
                <h1>404 page not found</h1>
            </div>
        )
    }
}