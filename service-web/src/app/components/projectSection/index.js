import React, {Component} from 'react';
import {withRouter} from "react-router-dom";


class ProjectSectionComponent extends Component {
    render() {
        return (
            <div className="search-bar">
                <input className="text-field" placeholder="" id="" type="search"/>
                <div className="search-icon"><img src="/images/search.svg" alt="Search Icon"/></div>
            </div>
        )
    }
}

export const ProjectSection = withRouter(ProjectSectionComponent);
