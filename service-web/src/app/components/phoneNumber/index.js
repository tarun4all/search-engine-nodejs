import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class PhoneNumberComponent extends Component {
    render() {
        // console.log('phoneNumber', this.props);
        return (
            <div className = "phoneNumberContainer">
                {this.props.title} / {this.props.subTitle}
                <hr/>
                <div className="phoneNumber">
                    {this.props.phoneNumber}
                </div>
            </div>
        )
    }
}

export const PhoneNumber = withRouter(PhoneNumberComponent)
