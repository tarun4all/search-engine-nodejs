import React, {Component} from 'react';
import {Header} from "../components/header";
import {Route, withRouter} from "react-router-dom";
import {HomeScreenContainer} from "../container/homeContainer";
import {AboutUsScreenContainer} from "../container/aboutUsContainer";
import {ContactScreenContainer} from "../container/contactContainer";
import {PortfolioScreenContainer} from "../container/portfolioContainer";
import {CaseStudyScreenContainer} from "../container/caseStudyContainer";
import {Footer} from "../components/footer";
import {isMobile} from "../utils";
import {getConfig} from "../store/ui/action";
import {connect} from "react-redux";

class AppBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            isMobile: isMobile()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    toggleSidebar() {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }

    closeBodySideBar() {
        if (this.state.sidebarOpen) {
            this.toggleSidebar();
        }
    }

    render() {
        const {sidebarOpen} = this.state;
        const {location: {pathname}} = this.props;
        return (
            <div className="animated fadeIn slower">
                <section className={"container-section" + (sidebarOpen && ' isOpen')}>
                    <section className="wrapper-section">
                        <Header toggleSidebar={this.toggleSidebar.bind(this)} sidebarOpen={sidebarOpen}
                                pathname={pathname}/>
                        <section>
                            <Route exact path="/" component={HomeScreenContainer}/>
                            <Route path="/about" component={AboutUsScreenContainer}/>
                            <Route path="/contact" component={ContactScreenContainer}/>
                            <Route exact path="/portfolio" component={PortfolioScreenContainer}/>
                            <Route path="/portfolio/:slug" component={CaseStudyScreenContainer}/>
                        </section>
                        <Footer/>
                        <div className="overlayBody" onClick={this.closeBodySideBar.bind(this)}/>
                    </section>
                </section>
            </div>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBase));
