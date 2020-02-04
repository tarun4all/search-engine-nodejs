import React, {Component} from 'react';
import {Link} from "react-router-dom";

export class ProjectBlock extends Component {
    render() {
        const {post: {slug, title, image: {secure_url}}} = this.props;
        return (
            <div className="col-6 col-sm-6 col-md-4 col-lg-4">
                <div className="figure-hover">
                    <Link to={'/portfolio/' + slug}>
                        <img src={secure_url} alt="project" className="project-img"/>
                        <div className="hover-overlay">
                            <div className="center_button">
                                {title}
                            </div>
                        </div>
                    </Link>
                </div>
                <Link to={'/portfolio/' + slug}>
                    <div className="project_img-title">{title}</div>
                </Link>
            </div>
        )
    }
}
