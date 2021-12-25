import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateAddress, validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createShelter, deleteShelter, editShelter, getShelters } from '../../actions/shelter';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const Shelter = (props) => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ shelterId: 0, name: "", address: "" });

    const dispatch = useDispatch();

    const { shelters, message } = useSelector(state => ({
        shelters: state.shelter.shelters,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getShelters());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createShelter(model.name, model.address))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ shelterId: 0, name: "", address: "" });
    }

    const editRecord = () => {
        dispatch(editShelter(model.shelterId, model.name, model.address))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteShelter(item.shelterId))
            .then(() => { })
            .catch(() => { })
    }

    const openPage = (item) => {
        props.history.push("/animals/" + item.shelterId);
    }

    const getUserValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("shelters")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                        <Button onClick={() => { dispatch(getShelters()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={shelters} k="shelterId" columns={['name', 'address']} deleteRecord={deleteRecord} editRecord={getUserValues} openPage={openPage}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default Shelter;