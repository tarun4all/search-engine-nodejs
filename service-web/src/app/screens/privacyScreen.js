import React, {Component} from 'react';
import {Footer} from '../components/Footer'
export class privacyScreen extends Component {
    render() {
        //TODO fix searchInput component to be able to search from here
        return (
            <div>
                <div className="search-result-header clearfix">
                    <a href="/" className="logo-google"><img src="images/googlelogo.png" className="header-logo"
                                                             alt="logo"/></a>
                </div>
                <div className="wrapper-section result-wrapper">
                    <div className="privacy-container">
                        <div className="privacy-content-row">
                            <h1>Privacy policy</h1>
                            <p>Qwant ensures that your privacy is protected, and this is the cornerstone of our
                                philosophy. We don’t use any cookie nor any tracking device that may allow us to track
                                your browsing habits or to establish your profile. You are of course entitled to the
                                rights provided by the EU General Data Protection Regulation (“GDPR”), but most of all
                                we care about fully respecting the data minimization principle, that is that we don’t
                                collect data that is unnecessary to deliver to you the services that you need. We never
                                try to know who you are or what you are personally doing when using our search engine.
                                When we do need to collect data, we do not disclose nor sell it for commercial or other
                                uses. We use it exclusively to provide you with the services offered by Qwant.</p>
                            <p>This Privacy Policy is aimed at explaining in further details our ethical approach
                                towards personal data, and at explaining the few cases where we have to collect
                                information about you, the reasons why we collect such data, and the way we might use
                                it. It also presents the security measures that we apply to protect their
                                confidentiality, and reminds your rights and how to exercize them.</p>
                            <h1>How does Qwant protect your privacy?</h1>
                            <p>Qwant ensures that your privacy is protected, and this is the cornerstone of our
                                philosophy. We don’t use any cookie nor any tracking device that may allow us to track
                                your browsing habits or to establish your profile. You are of course entitled to the
                                rights provided by the EU General Data Protection Regulation (“GDPR”), but most of all
                                we care about fully respecting the data minimization principle, that is that we don’t
                                collect data that is unnecessary to deliver to you the services that you need. We never
                                try to know who you are or what you are personally doing when using our search engine.
                                When we do need to collect data, we do not disclose nor sell it for commercial or other
                                uses. We use it exclusively to provide you with the services offered by Qwant.</p>
                            <p>This Privacy Policy is aimed at explaining in further details our ethical approach
                                towards personal data, and at explaining the few cases where we have to collect
                                information about you, the reasons why we collect such data, and the way we might use
                                it. It also presents the security measures that we apply to protect their
                                confidentiality, and reminds your rights and how to exercize them.</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
