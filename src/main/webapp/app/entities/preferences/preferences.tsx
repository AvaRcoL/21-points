import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntities } from './preferences.reducer';
import { IPreferences } from 'app/shared/model/preferences.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPreferencesProps {
  getEntities: ICrudGetAllAction<IPreferences>;
  preferencesList: IPreferences[];
  match: any;
}

export class Preferences extends React.Component<IPreferencesProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { preferencesList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <Translate contentKey="twentyOnePointsApp.preferences.home.title">Preferences</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="twentyOnePointsApp.preferences.home.createLabel">Create new Preferences</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="twentyOnePointsApp.preferences.weeklyGoal">Weekly Goal</Translate>
                </th>
                <th>
                  <Translate contentKey="twentyOnePointsApp.preferences.weightUnits">Weight Units</Translate>
                </th>
                <th>
                  <Translate contentKey="twentyOnePointsApp.preferences.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {preferencesList.map((preferences, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${preferences.id}`} color="link" size="sm">
                      {preferences.id}
                    </Button>
                  </td>
                  <td>{preferences.weeklyGoal}</td>
                  <td>{preferences.weightUnits}</td>
                  <td>{preferences.user ? preferences.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${preferences.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${preferences.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${preferences.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ preferences }) => ({
  preferencesList: preferences.entities
});

const mapDispatchToProps = {
  getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
