import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import Points from './points';
import Weight from './weight';
import Preferences from './preferences';
import BloodPressure from './blood-pressure';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <Route path={`${match.url}/points`} component={Points} />
      <Route path={`${match.url}/weight`} component={Weight} />
      <Route path={`${match.url}/preferences`} component={Preferences} />
      <Route path={`${match.url}/blood-pressure`} component={BloodPressure} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
