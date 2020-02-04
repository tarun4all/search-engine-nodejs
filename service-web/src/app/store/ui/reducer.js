import {GET_CONFIG, GET_CONFIG_SUCCESS, GET_CONFIG_ERROR} from "./action";

const initialState = {
    loading: false,
    teamMembers: [],
    posts: []
};


const reducer = function counter(state = initialState, action) {
    switch (action.type) {
        case GET_CONFIG: {
            return {
                ...state,
                loading: true
            };
        }
        case GET_CONFIG_SUCCESS: {
            return {
                ...state,
                loading: false,
                teamMembers: action.teamMembers,
                posts: action.posts
            };
        }
        case GET_CONFIG_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        default:
            return state;
    }
};

export default reducer;
