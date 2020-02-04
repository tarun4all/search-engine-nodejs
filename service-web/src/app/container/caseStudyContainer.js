import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CaseStudyScreen} from "../screens/caseStudyScreen";
import {getConfig} from "../store/ui/action";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export const CaseStudyScreenContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CaseStudyScreen));
