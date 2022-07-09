import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { memoriespost } from './memoriespost.reducer';
import { navigatationpath } from './navigatationpath.reducer';

const rootReducer = combineReducers({
    registration,
    authentication,
    memoriespost,
    navigatationpath
});

export default rootReducer;