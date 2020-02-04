import React, {Component} from 'react';
import {ProjectSection} from "../projectSection";

export class CaseStudySection extends Component {
    render() {
        const {title, content: {brief}, projectImages} = this.props.post;
        return (
            <div className="container project-section animated fadeIn">
                <div className="row">
                    <div className="col-lg-12 text-center mt-2"><h1 className="defaultSpace pb-3">{title}</h1>
                        <p className="mb-5 caseStudy-title" dangerouslySetInnerHTML={{__html: brief}}/></div>
                </div>
                <div className="row">
                    {
                        projectImages.map(({secure_url}) => <div className="col-12">
                            <div className="project_bg text-center">
                                <img src={secure_url} alt="caseStudy"/>
                            </div>
                        </div>)
                    }
                </div>
                <ProjectSection/>
            </div>
        )
    }
}
