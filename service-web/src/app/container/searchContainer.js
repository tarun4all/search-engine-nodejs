import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {SearchScreen} from "../screens/searchScreen";

const mapStateToProps = ({ui}) => {
    return {
        ...ui
    };
};
export const SearchScreenContainer = withRouter(connect(mapStateToProps)(SearchScreen));
