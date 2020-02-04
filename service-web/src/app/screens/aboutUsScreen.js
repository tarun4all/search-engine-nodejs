import React, {Component} from 'react';
import {ContactForm} from "../components/contactForm";
import {AboutUsAvatar} from "../components/aboutUsAvatar";

export class AboutUsScreen extends Component {
    render() {
        const {teamMembers, isLoading} = this.props;
        return (
            <div className="wrapper-content iner-wrapper">
                <div className="container mb-5 project-section service-p">
                    <div className="row">
                        <div className="col-lg-12 text-center mt-2"><h1 className="defaultSpace">About Us</h1></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-md-2 col-lg-2 hidden-xs"><img
                            src={"/images/logoBlackSquare.png"}
                            className="project-img mt-0" alt="about"/>
                        </div>
                        <div className="col-sm-9 col-md-10 col-lg-10"><h3 className="mb-4 hidden-xs">About The
                            Company</h3>
                            <p className="">Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s,
                            </p>
                            <p className="mb-5">Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s,
                            </p>
                            <span className="horizontal-line-mobile"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-9 col-md-10 col-lg-10 offset-lg-2 offset-md-2 offset-sm-3">
                            <h3 className="mb-4 d-block mt-5 mt-sm-0 mt-md-0 mt-lg-0">Our Team</h3>
                            <p className="d-block">Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s,
                            </p>
                            <div className="row">
                                {
                                    teamMembers.map((teamMember, i) => <AboutUsAvatar key={i} teamMember={teamMember}/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <ContactForm/>
            </div>
        )
    }
}
