import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getConfig} from "../store/ui/action";
import {HomeScreen} from "../screens/homeScreen";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export const HomeScreenContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
