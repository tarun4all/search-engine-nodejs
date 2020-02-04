import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import {connect} from "react-redux";
import {getConfig} from "../store/ui/action";

import {isMobile} from "../utils";
import {SplashVideo} from "../components/splashVideo";
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

    componentDidMount() {
        this.props.getConfig();
    }


    changeLoadingState(loading) {
        this.setState({
            loading
        })
    }


    render() {
        const {loading} = this.state;
        return (
            <div>
                {loading && <SplashVideo changeLoadingState={this.changeLoadingState.bind(this, false)}/>}
                <Router>
                    <AppBase className={loading && 'displayNone'}/>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getConfig: () => {
            dispatch(getConfig());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
