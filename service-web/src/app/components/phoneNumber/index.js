import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class PhoneNumberComponent extends Component {
    // constructor(props){
    //     // console.log(props);
    //     super(props);
    //     // this.state = {
    //     //     dataObj:props.result,
    //     // };
    //     // console.log(this.state.dataObj);
    // }

    render() {
        return (
            <div className = "phoneNumberContainer">
                {this.props.title}
                <hr/>
                <div className="phoneNumber">
                    {this.props.phoneNumber}
                </div>
            </div>
        )
    }
}

export const PhoneNumber = withRouter(PhoneNumberComponent)
