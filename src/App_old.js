import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from 'axios';

const AuthContext = React.createContext(null);

const AuthProvider = ({children})=>{
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null); 

  const handleLogin = async() =>{
      const token  = null;
      setToken(token);

      const origin = location.state?.from?.pathname || 'dashboard';
      navigate(origin);
  }

  const handleLogout = () =>{
    setToken(null);
  }

  const value = {
    token,
    Login : handleLogin,
    onLogout : handleLogout
  }

  return(
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

const useAuth = ()=>{
  return React.useContext(AuthContext);
}

const ProtectedRoute = ({children}) =>{
  const {token} = useAuth();
  const location = useLocation();

  if (!token) {
      return <Navigate to='/login' replace state={{from : location}}></Navigate>
  }

  return children;
}



const Login = () => {
    
    // const login = useAuth();
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [otp, setOtp] = useState();
    const [textButton, setTextButton] = useState("Request OTP");
    const [type, setType] = useState("hidden");
    const navigate = useNavigate();
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
                // setToken(otpSend.data.data);
                // console.log('line 36',token)
                 const token = otpSend.data.data;
                setToken(token);
                navigate("/dashboard")
                console.log('token adalah',token);

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

const Navigation = () =>{
  const {token, onLogout} = useAuth();

  return(
    <nav>
      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to="/admin">Admin</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  )
}

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};

const Admin = () => {
  const { token } = useAuth();
  return (
    <>
      <h2>Admin (Protected)</h2>
      <div>Authenticated as {token}</div>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

function App() {
  return (
    <>
    <AuthProvider>
      <h1>Belajar React</h1>
      <Navigation />
      <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
