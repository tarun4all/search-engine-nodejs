import React, {Component} from 'react';
import {ContactForm} from "../components/contactForm";
import {ProjectSection} from "../components/projectSection";

export class PortfolioScreen extends Component {
    render() {
        return (
            <div className="wrapper-content iner-wrapper">
                <div className="container mb-5 project-section service-p paddingLess">
                    <ProjectSection lazyLoading={true}/>
                </div>
                <ContactForm/>
            </div>
        )
    }
}
