
import { Card, Button, Form, Container, Row, Col, ListGroup, InputGroup } from "react-bootstrap";
import axios from 'axios';
import React from "react";
import { AuthContext } from "../../App";
import { useState } from "react";
export const Login2 = () => {
    // const { onLogin2, phoneNumber, setPhoneNumber,otp, setOtp, textButton,hidden, setHidden } = useAuth();
    // const Auth
    const { params, seParams, onLogin2, } = React.useContext(AuthContext);
    return (
        <div className="test">
            <Container >
            <Row>
                    <Col className="">
                        <div className="distance-item">
                            <Card className="card-custom">
                                <Card.Body>
                                    <h1 className="text-center account-login-text">Account Login</h1>
                                    <div>
                                        <Form onSubmit={(event) => {
                                            event.preventDefault();
                                            onLogin2(params)
                                        }}>
                                            <Form.Group className="mb-3 form-custom" controlId="formBasicEmail">
                                                <Form.Group>
                                                <Form.Control type="tel" placeholder="Wa number" name="number" required onChange={event => seParams({ ...params, phoneNumber: event.target.value, isDisabled: false, textFeedBack : '' })}  onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                                     <Form.Control.Feedback className={params.colorText} type={params.feedBackType}>
                                                        {params.textFeedBack}
                                                    </Form.Control.Feedback>
                                                    </Form.Group>
                                                <div className="otp-form">
                                                    <Form.Control type={params.hidden} placeholder="Enter OTP Password" name="otp" maxLength="4" onChange={event => seParams({ ...params, otp: event.target.value })} />
                                                </div>
                                            </Form.Group>
                                            <Button variant="btn btn-primary btn-custom" type="submit" disabled={params.isDisabled}>{params.textButton}</Button>
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};
