import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import { createLogPoint, getLogPoints } from '../../actions/logPoint';
import { useTranslation } from 'react-i18next';
import List from '../ListComponents/List'

const LogPoint = (props) => {
    const id = props.match.params.id;
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { volunteer, dateStart, dateEnd, logPoints } = useSelector(state => ({
        volunteer: state.logPoint.volunteer,
        dateStart: state.logPoint.dateStart,
        dateEnd: state.logPoint.dateEnd,
        logPoints: state.logPoint.logPoints,
    }), shallowEqual)

    useEffect(() => {
        dispatch(getLogPoints(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, props.history, dispatch])

    const createRecord = () => {
        dispatch(createLogPoint(id))
            .then(() => { })
            .catch(() => { })
    }

    return (
        <Container>
            <Jumbotron className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("volunteer")}: {volunteer}</strong>
                        </h3>
                        <h3>
                            <strong>{t("dateStart")}: {new Date(dateStart).toLocaleString()}</strong>
                        </h3>
                        <h3>
                            <strong>{t("dateEnd")}: {new Date(dateEnd).toLocaleString()}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getLogPoints(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("logPoints")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => createRecord()} color="success">{t("Create")}</Button>
                    </Col>
                </Row>
            </Container>
            <List recorts={logPoints.map(x => { return { ...x, dateTime: new Date(x.dateTime).toLocaleString() } })} k="logPointId" columns={['point', 'dateTime']} action={false}/>
        </Container>
    );
};

export default LogPoint;