import {combineReducers} from 'redux';
import reducer from './Store/reducer/reducer';

const rootReducer = history =>
    combineReducers({
        reducer: reducer,
    });
export default rootReducer;
