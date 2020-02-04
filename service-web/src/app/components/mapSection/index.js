import React, {Component} from 'react';

export class MapSection extends Component {
    render () {
        return (
            <div className="row">
                <div
                    className="col-sm-7 col-md-8 col-lg-8 order-sm-last order-md-last order-lg-last mt-4 mt-sm-0 mt-md-0 mt-lg-0">
                    <div className="full-width">
                        <iframe width="100%" height="300"
                                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=E 43/1 Springboard, Okhla Phase-2,&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                                title="Map"
                        ><a
                            href="https://www.maps.ie/map-my-route/">Create route map</a></iframe>
                    </div>
                    <br/>
                </div>
                <div className="col-sm-5 col-md-4 col-lg-4">
                    <div className="location-title">Location</div>
                    <div className="location-description text-black-50">
                        E 43/1 Springboard, Okhla Phase-2,<br/>
                        New Delhi - 110020
                    </div>
                    <div className="location-title mt-4">Contact Detail</div>
                    <abbr className="location-description text-black-50">+91-8800789386</abbr>
                </div>
            </div>
        )
    }
}
