import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ContactScreen} from "../screens/contactScreen";
import {getConfig} from "../store/ui/action";

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export const ContactScreenContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactScreen));
