import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './weight.reducer';
import { IWeight } from 'app/shared/model/weight.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWeightDetailProps {
  getEntity: ICrudGetAction<IWeight>;
  weight: IWeight;
  match: any;
}

export class WeightDetail extends React.Component<IWeightDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { weight } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="twentyOnePointsApp.weight.detail.title">Weight</Translate> [<b>{weight.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="timestamp">
                  <Translate contentKey="twentyOnePointsApp.weight.timestamp">Timestamp</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={weight.timestamp} type="date" format={APP_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="weight">
                  <Translate contentKey="twentyOnePointsApp.weight.weight">Weight</Translate>
                </span>
              </dt>
              <dd>{weight.weight}</dd>
              <dt>
                <Translate contentKey="twentyOnePointsApp.weight.user">User</Translate>
              </dt>
              <dd>{weight.user ? weight.user.id : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/weight" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/entity/weight/${weight.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ weight }) => ({
  weight: weight.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(WeightDetail);
