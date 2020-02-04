import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import {connect} from "react-redux";

import {isMobile} from "../utils";
import AppBase from "./appBase";


class RouterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            isMobile: isMobile(),
            loading: true
        }
    }

    componentDidMount() {}


    changeLoadingState(loading) {
        this.setState({
            loading
        })
    }


    render() {
        const {loading} = this.state;
        return (
            <div>
                <Router>
                    <AppBase className={loading && 'displayNone'}/>
                </Router>
            </div>
        )
    }
}

export default connect()(RouterContainer);
