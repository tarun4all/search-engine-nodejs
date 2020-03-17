import React, {Component} from "react"
import ContentLoader from "react-content-loader"
import {withRouter} from "react-router-dom";


class PlaceholderComponent extends Component {

    render() {
        let width = this.props.width;
        let headingWidthMultiplier = 0.26;
        let contentWidthMultiplier = 0.52;

        // console.log('width',this.props.width);
        if(width>1075) width = 1075;
        if(width<667)
        {
            headingWidthMultiplier = 0.45;
            contentWidthMultiplier = 0.87;
        }


        return (
            <ContentLoader
                speed={2}
                width={width}
                height={120}
                // viewBox="0 0 1920 120"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >

                <rect x="0" y="0" rx="3" ry="3" width={width*headingWidthMultiplier} height="18" />
                <rect x="0" y="28" rx="3" ry="3" width={width*contentWidthMultiplier} height="70" />

            </ContentLoader>
        )
    }
}

export const Placeholder = withRouter(PlaceholderComponent);
