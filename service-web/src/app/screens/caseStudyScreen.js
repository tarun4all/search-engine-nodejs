import React, {Component} from 'react';
import {ContactForm} from "../components/contactForm";
import {CaseStudySection} from "../components/caseStudySection";

export class CaseStudyScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setLoading();
        }
    }

    setLoading() {
        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 0)
    }

    render() {
        const {slug} = this.props.match.params;
        const {loading} = this.state;
        const post = (this.props.posts || []).find((post) => {
            return post.slug === slug;
        });
        return (
            <div className="wrapper-content iner-wrapper">
                {!loading && post && <CaseStudySection post={post}/>}
                <ContactForm/>
            </div>
        )
    }
}
