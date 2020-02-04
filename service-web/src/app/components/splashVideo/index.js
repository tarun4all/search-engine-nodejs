import React, {Component} from 'react';

export class SplashVideo extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.changeLoadingState();
        }, 1000)
    }

    render() {
        return (
            <div className="splashDiv">
            </div>
        )
    }
}
