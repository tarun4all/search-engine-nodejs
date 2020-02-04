import React, {Component} from 'react';
import {Hero} from "../components/hero";
import {ContactForm} from "../components/contactForm";
import {ProjectSection} from "../components/projectSection";
import {WhoAreWeSection} from "../components/whoAreWeSection";
// import {ServiceSection} from "../components/serviceSection";
// import {ClientSection} from "../components/clientSection";

export class HomeScreen extends Component {
    render() {
        return (
            <div>
                <Hero/>
                <ProjectSection/>
                <WhoAreWeSection/>
                {/*<ServiceSection/>*/}
                {/*<ClientSection/>*/}
                <ContactForm/>
            </div>
        )

    }
}
