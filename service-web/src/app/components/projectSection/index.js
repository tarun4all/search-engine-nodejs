import React, {Component} from 'react';
import {ProjectBlock} from "../projectBlock";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class ProjectSectionComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {lazyLoading, posts, isLoading} = this.props;
        return (
            <div className="container project-section" id="portfolio">
                <div className="row">
                    <div className="col-lg-12 text-center"><h1 className="defaultSpace">Projects</h1></div>
                </div>
                <div className="row">
                    {
                        posts.map((post, i) => <ProjectBlock key={i} post={post}/>)
                    }
                    {
                        !lazyLoading && <div className="col-12 text-center mt-5 mb-5">
                            <Link to="/portfolio" className="btn">
                                <svg width="200" height="100%">
                                    <defs>
                                        <linearGradient id="grad1">
                                            <stop offset="0%" stopColor="#33ccff"/>
                                            <stop offset="25%" stopColor="#3399cc"/>
                                            <stop offset="50%" stopColor="#cc9933"/>
                                            <stop offset="75%" stopColor="#ff6666"/>
                                            <stop offset="100%" stopColor="#ffcc33"/>
                                        </linearGradient>
                                    </defs>
                                    <rect x="5" y="15" rx="25" fill="none" stroke="url(#grad1)" width="190"
                                          height="40"/>
                                </svg>
                                <span className="seeMore">See More</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export const ProjectSection = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectSectionComponent));
