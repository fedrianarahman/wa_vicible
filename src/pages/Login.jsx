import React from 'react'
import "./style/Login.css";
import { useState } from 'react'
import { Card, Button, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { isDisabled } from '@testing-library/user-event/dist/utils';



const Login = () => {
    
    // const login = useAuth();
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [otp, setOtp] = useState();
    const [textButton, setTextButton] = useState("Request OTP");
    const [type, setType] = useState("hidden");
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if (otp) {
            // const phoneNumber = setPhoneNumber(phoneNumber);
            // const otp = setOtp(otp);
            let otpSend = await axios.post('https://wa.vcible.com/api/dev/wa/login-by-otp',{phoneNumber ,otp} );
            console.log(otpSend.data);//{status: 'success', code: 200, data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDJ9.OI9FrSujIBfR7t-wKRTIuVkB32b784idX_61szw8eMs'}
            console.log("line 27", otpSend);
            if (otpSend.data.status == "success") {
                // login = otpSend.data.data
                // alert(' baris 29 berhasil');
                //  alert(otpSend.data.data);
                setToken(otpSend.data.data);
                console.log('line 36',token)
                navigate('/dashboard', {replace : true});

            }else{
                alert(otpSend.data.message);
                console.log(otpSend.data.message)
            }
            // navigate("/dashboard", {replace : true})
            // <Navigate to="/dashboard" replace/>
            // window.location="./Dashboard.jsx";
        }else{
            // const phoneNumber = setPhoneNumber(phoneNumber);
            // const otp = setOtp(otp);
            let res = await axios.post('https://wa.vcible.com/api/dev/wa/request-otp', {phoneNumber});
            setType("text");
            setTextButton("Log in");
            console.log(res.data);
        }
        // console.log(phoneNumber);
        // console.log(otp);
    }
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
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3 form-custom" controlId="formBasicEmail">
                                                <Form.Control type="text" placeholder="Wa number" name="number"  required onChange={event => setPhoneNumber(event.target.value) }/>
                                                     <div className="otp-form">
                                                     <Form.Control type={type} placeholder="Enter OTP Password" name="otp" maxLength="4" onChange={event => setOtp(event.target.value)}/>
                                                     </div>
                                            </Form.Group>
                                            <Button variant="btn btn-primary"   type="submit" >{textButton} </Button>
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
}

export default Login;