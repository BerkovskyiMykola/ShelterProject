import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createWalk, deleteWalk, editWalk, getWalks } from '../../actions/walk';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const Walk = (props) => {
    const convertDate = (dateTime) => {
        return new Date(dateTime.getTime() - (dateTime.getTimezoneOffset() * 60000)).toISOString();
    }

    const id = props.match.params.id;

    const [model, setModel] = useState({ walkId: 0, volunteer: "", dateStart: convertDate(new Date()).substring(0, 16) });
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);

    const dispatch = useDispatch();

    const { category, name, type, walks, message } = useSelector(state => ({
        name: state.walk.name,
        category: state.walk.category,
        type: state.walk.type,
        walks: state.walk.walks,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getWalks(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createWalk(model.volunteer, model.dateStart, id))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ walkId: 0, volunteer: "", dateStart: convertDate(new Date()).substring(0, 16) })
    }

    const deleteRecord = (item) => {
        dispatch(deleteWalk(item.walkId))
            .then(() => { })
            .catch(() => { })
    }

    const openPage = (item) => {
        props.history.push("/logPoints/" + item.walkId);
    }

    return (
        <Container>
            <Jumbotron style={{ backgroundColor: "#EEF7FB" }}>
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("animalName")}: {name}</strong>
                        </h3>
                        <h3>
                            <strong>{t("type")}: {type}</strong>
                        </h3>
                        <h3>
                            <strong>{t("category")}: {category}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getWalks(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("walks")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={walks.map(x => { return { ...x, dateStart: new Date(x.dateStart).toLocaleString(), dateEnd: new Date(x.dateEnd).toLocaleString() } })} k="walkId" columns={['volunteer', 'dateStart', 'dateEnd']} deleteRecord={deleteRecord} openPage={openPage}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="volunteer" value={model}
                    setValue={(e) => { setModel({ ...model, "volunteer": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="dateStart" value={model}
                    setValue={(e) => { setModel({ ...model, "dateStart": convertDate(new Date(e.target.value)).substring(0, 16) }) }} type="datetime-local" min={convertDate(new Date()).substr(0, 16)} />
            </ModalWindow>
        </Container>
    );
};

export default Walk;