import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createAnimal, deleteAnimal, editAnimal, getAnimals } from '../../actions/animal';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const Animal = (props) => {
    const id = props.match.params.id;

    const [model, setModel] = useState({ animalId: 0, name: "", category: "", type: "" });
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const dispatch = useDispatch();

    const { Address, Name, animals, message } = useSelector(state => ({
        Name: state.animal.name,
        Address: state.animal.address,
        animals: state.animal.animals,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getAnimals(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createAnimal(model.name, model.category, model.type, id))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ animalId: 0, name: "", category: "", type: "" })
    }

    const editRecord = () => {
        dispatch(editAnimal(model.animalId, model.name, model.category, model.type))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteAnimal(item.animalId))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const openPage = (item) => {
        props.history.push("/walks/" + item.animalId);
    }

    return (
        <Container>
            <Jumbotron style={{ backgroundColor: "#EEF7FB"}}>
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("name")}: {Name}</strong>
                        </h3>
                        <h3>
                            <strong>{t("address")}: {Address}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getAnimals(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("animals")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={animals} k="animalId" columns={['name', 'category', 'type']} deleteRecord={deleteRecord} editRecord={getUserValues} openPage={openPage}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="category" value={model}
                    setValue={(e) => { setModel({ ...model, "category": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="type" value={model}
                    setValue={(e) => { setModel({ ...model, "type": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="category" value={model}
                    setValue={(e) => { setModel({ ...model, "category": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="type" value={model}
                    setValue={(e) => { setModel({ ...model, "type": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default Animal;