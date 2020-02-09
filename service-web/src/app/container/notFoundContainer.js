import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {NotFoundScreen} from "../screens/notFoundScreen";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};
export const NotFoundScreenContainer = withRouter(connect(mapStateToProps)(NotFoundScreen));
