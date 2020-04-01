import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {PrivacyPolicyScreen} from "../screens/privacyPolicyScreen";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};
export const PrivacyPolicyScreenContainer = withRouter(connect(mapStateToProps)(PrivacyPolicyScreen));
