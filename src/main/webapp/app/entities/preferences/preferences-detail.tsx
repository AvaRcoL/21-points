import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './preferences.reducer';
import { IPreferences } from 'app/shared/model/preferences.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPreferencesDetailProps {
  getEntity: ICrudGetAction<IPreferences>;
  preferences: IPreferences;
  match: any;
}

export class PreferencesDetail extends React.Component<IPreferencesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { preferences } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="twentyOnePointsApp.preferences.detail.title">Preferences</Translate> [<b>{preferences.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="weeklyGoal">
                  <Translate contentKey="twentyOnePointsApp.preferences.weeklyGoal">Weekly Goal</Translate>
                </span>
              </dt>
              <dd>{preferences.weeklyGoal}</dd>
              <dt>
                <span id="weightUnits">
                  <Translate contentKey="twentyOnePointsApp.preferences.weightUnits">Weight Units</Translate>
                </span>
              </dt>
              <dd>{preferences.weightUnits}</dd>
              <dt>
                <Translate contentKey="twentyOnePointsApp.preferences.user">User</Translate>
              </dt>
              <dd>{preferences.user ? preferences.user.id : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/preferences" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/entity/preferences/${preferences.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ preferences }) => ({
  preferences: preferences.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesDetail);
