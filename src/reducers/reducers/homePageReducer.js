import {actionTypes} from '../../actions';

const initialState = {
    inTrend: [],
    loading: true,
    error: false,
}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IN_TREND_REQUESTED: 
            return {
                ...state,
                loading: true
            }
        case actionTypes.IN_TREND_LOADED:
            return {
                ...state,
                loading: false,
                inTrend: action.payload
            }
        case actionTypes.IN_TREND_ERROR:
            return {
                ...state,
                error: true,
                loading: false
            }
        default:
            return state
    }
    
}

export default homePageReducer;