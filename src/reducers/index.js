import {combineReducers} from 'redux';
import budgetItems from './budgetReducer';
import defaults from './salaryReducer';

const rootReducer = combineReducers({
  budgetItems,
  defaults
});

export default rootReducer;
