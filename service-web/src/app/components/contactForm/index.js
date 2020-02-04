import React, {Component} from 'react';

export class ContactForm extends Component {
    render () {
        return (
            <section className="hello-blackshapes defaultSpace">
                <div className="container">
                    <div className="form-section">
                        <div className="row">
                            <div className="col-lg-12"><h1 className="light-clr mb-3 mb-sm-5 mb-md-5 mb-lg-5">Hello
                                There!</h1></div>
                        </div>
                        <div className="row">
                            <div className=" col-md-6 col-lg-6">
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6 pr-3 pr-sm-2 pr-md-2 pr-lg-2">
                                        <input type="text" placeholder="Name " className="control_field"/>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-6 pl-3 pl-sm-2 pl-md-2 pl-lg-2">
                                        <input type="text" placeholder="Contact  Number " className="control_field"/>
                                    </div>
                                    <div className="col-sm-12">
                                        <input type="text" placeholder="Email " className="control_field"/>
                                    </div>
                                    <div className="col-sm-12">
                                      <textarea type="text" placeholder="Message " rows="3"
                                                className="control_field h-100 pt-3 pb-3 radius"/>
                                    </div>
                                    <div className="col-12">
                                        <button className="submit-btn mt-4">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blur-img"/>
            </section>
        )
    }
}
