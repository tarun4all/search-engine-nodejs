import React, {Component} from "react"
import ContentLoader from "react-content-loader"
import {withRouter} from "react-router-dom";


class PlaceholderComponent extends Component {
    render() {
        return (
            <ContentLoader
                speed={2}
                width={1920}
                height={100}
                viewBox="0 0 1920 100"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="3" ry="3" width="1000" height="18" />
                <rect x="0" y="28" rx="3" ry="3" width="1000" height="12" />
                <rect x="0" y="43" rx="3" ry="3" width="1000" height="12" />
                <rect x="0" y="58" rx="3" ry="3" width="1000" height="12" />
            </ContentLoader>
        )
    }
}

export const Placeholder = withRouter(PlaceholderComponent);
