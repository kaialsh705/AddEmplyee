import * as actionTypes from '../actions/actionTypes';

const initialState = {
    employee_data: null,
    is_saved: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMPLOYEE_DATA:
            return {
                ...state,
                employee_data: action.payload.employee_data,
            };
        case actionTypes.IS_SAVED:
            return {
                ...state,
                is_saved: action.payload.is_saved,
            };
        default:
            return state;
    }
};

export default reducer;
