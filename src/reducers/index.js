import {combineReducers} from 'redux';
import budget from './budgetReducer';

const rootReducer = combineReducers({
  budget
});

export default rootReducer;
