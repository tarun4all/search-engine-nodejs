import React, {Component} from 'react';
import {ContactForm} from "../components/contactForm";
import {MapSection} from "../components/mapSection";

export class ContactScreen extends Component {
    render() {
        return (
            <div className="wrapper-content iner-wrapper">
                <div className="container mb-5 contact_section service-p paddingLess">
                    <div className="row">
                        <div className="col-lg-12 text-center mt-2"><h1 className="defaultSpace">Contact Us</h1></div>
                    </div>
                    <MapSection/>
                </div>
                <ContactForm/>
            </div>
        )
    }
}
