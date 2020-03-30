import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {privacyScreen} from "../screens/privacyScreen";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};
export const privacyScreenContainer = withRouter(connect(mapStateToProps)(privacyScreen));
