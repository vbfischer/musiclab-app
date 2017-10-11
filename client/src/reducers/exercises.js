import {EXERCISES_LOAD_FULFILLED} from "../constants/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case EXERCISES_LOAD_FULFILLED:
            return {
                ...state,
                resources: action.payload

            }
        default:
            return state;
    }
}