import React, {Component} from 'react';

export class AboutUsAvatar extends Component {
    render() {
        const {name, post, image: {secure_url}} = this.props.teamMember;
        return (
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 mt-5">
                <div className="row">
                    <div className="col-auto m-auto">
                        <div className="avatar avatar-4by3  mb-3">
                            <img src={secure_url} alt="avatar"
                                 className="avatar-img rounded"/>
                        </div>
                    </div>
                    <div className="col textCenter">
                        <h3 className="card-title mb-1">
                            {name}
                        </h3>
                        <p className="card-text text-muted">
                            {post}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
