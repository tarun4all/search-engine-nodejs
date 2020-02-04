import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {PortfolioScreen} from "../screens/portfolioScreen";
import {getConfig} from "../store/ui/action";

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export const PortfolioScreenContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen));
