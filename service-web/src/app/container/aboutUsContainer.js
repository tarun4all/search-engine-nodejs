import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {AboutUsScreen} from "../screens/aboutUsScreen";
import {getConfig} from "../store/ui/action";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export const AboutUsScreenContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutUsScreen));
