import React, {Component} from 'react';

export class ClientSection extends Component {
    render () {
        return (
            <section className="gray-strip defaultSpace mt-5">
                <div className="container only-padding-desktop">
                    <div className="row">
                        <div className="col-lg-12 text-center"><h1>Our clients</h1></div>
                    </div>
                    <div className="row align-item-center desktop-client">
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3 mt-5 pt-2"><img
                            src={"/images/client/unis.png"} alt="client"/></div>
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3 mt-5 pt-2"><img
                            src={"/images/client/bluepoint.png"} alt="client"/></div>
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3 mt-5"><img
                            src={"/images/client/tata.png"} alt="client"/></div>
                        <div className="col-6 col-sm-3 col-md-3 col-lg-3 mt-5 pt-4"><img
                            src={"/images/client/reactive.png"} alt="client"/></div>
                    </div>
                    <div className="slider slider-nav mobile-view">
                        <div>
                            <div className="clien-mobile"><img src={"/images/client/unis.png"} alt="client"/></div>
                        </div>
                        <div>
                            <div className="clien-mobile"><img src={"/images/client/bluepoint.png"} alt="client"/></div>
                        </div>
                        <div>
                            <div className="clien-mobile"><img src={"/images/client/reactive.png"} alt="client"/></div>
                        </div>
                        <div>
                            <div className="clien-mobile"><img src={"/images/client/bluepoint.png"} alt="client"/></div>
                        </div>
                    </div>
                </div>
            </section>
        )

    }
}
