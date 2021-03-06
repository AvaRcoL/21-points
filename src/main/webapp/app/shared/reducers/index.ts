import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
import points from 'app/entities/points/points.reducer';
import weight from 'app/entities/weight/weight.reducer';
import preferences from 'app/entities/preferences/preferences.reducer';
import bloodPressure from 'app/entities/blood-pressure/blood-pressure.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export default combineReducers({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  points,
  weight,
  preferences,
  bloodPressure,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});
