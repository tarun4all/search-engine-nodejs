import React, {Component} from 'react';

export class Hero extends Component {
    render() {
        return (
            <section>
                <div className="videoContainer">
                    <video autoPlay muted loop poster="/video/header/header.png">
                        <source src="/video/header/header.mp4" type="video/mp4"/>
                    </video>
                    <div className="videoOverlay"/>
                    <div className="heroScroll">
                        <a><span/></a>
                    </div>
                </div>
            </section>
        )
    }
}
