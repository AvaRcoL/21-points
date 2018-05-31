import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './blood-pressure.reducer';
import { IBloodPressure } from 'app/shared/model/blood-pressure.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IBloodPressureUpdateProps {
  getEntity: ICrudGetAction<IBloodPressure>;
  updateEntity: ICrudPutAction<IBloodPressure>;
  createEntity: ICrudPutAction<IBloodPressure>;
  getUsers: ICrudGetAllAction<IUser>;
  users: IUser[];
  bloodPressure: IBloodPressure;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IBloodPressureUpdateState {
  isNew: boolean;
  userId: number;
}

export class BloodPressureUpdate extends React.Component<IBloodPressureUpdateProps, IBloodPressureUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.timestamp = new Date(values.timestamp);

    if (errors.length === 0) {
      const { bloodPressure } = this.props;
      const entity = {
        ...bloodPressure,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/blood-pressure');
  };

  userUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        userId: -1
      });
    } else {
      for (const i in this.props.users) {
        if (id === this.props.users[i].id.toString()) {
          this.setState({
            userId: this.props.users[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { bloodPressure, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-blood-pressure-heading">
              <Translate contentKey="twentyOnePointsApp.bloodPressure.home.createOrEditLabel">Create or edit a BloodPressure</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : bloodPressure} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="timestampLabel" for="timestamp">
                    <Translate contentKey="twentyOnePointsApp.bloodPressure.timestamp">Timestamp</Translate>
                  </Label>
                  <AvInput
                    type="datetime-local"
                    className="form-control"
                    name="timestamp"
                    value={isNew ? null : convertDateTimeFromServer(this.props.bloodPressure.timestamp)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="systolicLabel" for="systolic">
                    <Translate contentKey="twentyOnePointsApp.bloodPressure.systolic">Systolic</Translate>
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="systolic"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="diastolicLabel" for="diastolic">
                    <Translate contentKey="twentyOnePointsApp.bloodPressure.diastolic">Diastolic</Translate>
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="diastolic"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="user.id">
                    <Translate contentKey="twentyOnePointsApp.bloodPressure.user">User</Translate>
                  </Label>
                  <AvInput type="select" className="form-control" name="user.id" onChange={this.userUpdate}>
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="user.id" value={this.state.userId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/blood-pressure" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  users: storeState.userManagement.users,
  bloodPressure: storeState.bloodPressure.entity,
  loading: storeState.bloodPressure.loading,
  updating: storeState.bloodPressure.updating
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(BloodPressureUpdate);
