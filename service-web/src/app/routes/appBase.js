import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import {HomeScreenContainer} from "../container/homeContainer";
import {SearchScreenContainer} from "../container/searchContainer";
import {isMobile} from "../utils";
class AppBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            isMobile: isMobile()
        }
    }

    componentDidUpdate(prevProps) {}

    render() {
        return (
                    <section className="main-section">
                            <Route exact path="/" component={HomeScreenContainer}/>
                            <Route path="/search" component={SearchScreenContainer}/>
                    </section>
        );
    }
}

export default withRouter(AppBase);
