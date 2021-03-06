import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../actions/message";
import { editUser, getUser } from "../../actions/profile";
import { validateField, validateRequired } from "../../validation/validation";
import { Field } from "../FormComponents";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Row, Button, Col, Container, Jumbotron } from "reactstrap";

export default function Profile(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ lastname: "", firstname: "" });

    const { profile, message,user } = useSelector(state => ({
        profile: state.profile.profile,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUser())
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, props.history])

    const editRecord = () => {
        dispatch(editUser(user.userId, model.lastname, model.firstname))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
            })
            .catch(() => { })
    }

    return (
        <Container>
            <Jumbotron style={{ backgroundColor: "#EEF7FB" }}>
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{profile.lastname} {profile.firstname}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button color="warning" onClick={() => { dispatch(clearMessage()); setModalEdit(true); setModel(profile); }}>
                            {t("Edit")}
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <p>
                <strong>{t("email")}:</strong> {profile.email}
            </p>
            <p>
                <strong>{t("role")}:</strong> {profile.role}
            </p>
            <ModalWindow modal={modalEdit} deactiveModal={() => { setModalEdit(false); }} textHeader={t("Edit")}
                textButton={t("Edit")} method={editRecord} message={message}
            >
                <Field name="lastname" value={model}
                    setValue={(e) => { setModel({ ...model, "lastname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="firstname" value={model}
                    setValue={(e) => { setModel({ ...model, "firstname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>
        </Container>
    );
}