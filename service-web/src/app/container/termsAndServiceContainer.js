import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {TermsAndService} from "../screens/termsAndService";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};
export const TOSContainer = withRouter(connect(mapStateToProps)(TermsAndService));
