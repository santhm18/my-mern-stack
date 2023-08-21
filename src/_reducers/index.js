import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import {userUpdate} from './userupdate.reducer';
import { memoriespost } from './memoriespost.reducer';
import { chart } from './chart.reducer';
import { navigatationpath } from './navigatationpath.reducer';

const rootReducer = combineReducers({
    registration,
    userUpdate,
    authentication,
    memoriespost,
    chart,
    navigatationpath
});

export default rootReducer;