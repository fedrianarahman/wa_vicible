import * as React from 'react';
import './App.css';
import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import { useState } from 'react';
import { Card, Button, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from 'axios';
import loadable from '@loadable/component';

const fakeAuth = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve('2342f2f1d131rf12'), 200);
    });

const Home2 = loadable(()=> import('./component2/pages2/Home-2'),{
    resolveComponent: (components) => components.Home2
});
const Login2 = loadable(()=> import('./component2/pages2/Login-2'),{
    resolveComponent: (components) => components.Login2
});

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = React.useState(null);
    //const [phoneNumber, setPhoneNumber] = React.useState()
    //const [textButton, setTextButton] = React.useState("Request OTP")
    //const [otp, setOtp] = React.useState()
    //const [hidden, setHidden] = React.useState('hidden');
    
    const [params, seParams] = React.useState({hidden  :'hidden', textButton : "Request OTP", phoneNumber : '', otp : ''});
    const handleLogin = async () => {
        const token = await fakeAuth();

        setToken(token);

        const origin = location.state?.from?.pathname || '/dashboard';
        navigate(origin);
    };

    const handleLogin2 = async (param) => {
        // alert(phone);
        const phoneNumber = param.phoneNumber;
        const otp = param.otp;
        if (param.otp) {
            let otpSend = await axios.post('https://wa.vcible.com/api/dev/wa/login-by-otp',{phoneNumber, otp} );
            console.log('line 42',otpSend.data.data); 
            const token = otpSend.data.data;
            setToken(token);
            const origin = location.state?.from?.pathname || '/dashboard';
            navigate(origin);
        } else {
            
        let res = await axios.post('https://wa.vcible.com/api/dev/wa/request-otp', {phoneNumber});
        console.log(res.data);
            const changeText = params.textButton = "Login";
            const changeType = params.hidden = "text";
            seParams(changeText);
            seParams(changeType);
            seParams({...params, hidden: "text",textButton : 'Log in' })
        }
        // if (Otp) {
        //     let otpSend = await axios.post('https://wa.vcible.com/api/dev/wa/login-by-otp',{phone ,Otp} );
        //     console.log(otpSend.data);
        // }else{
        //     console.log(res.data);
        //     setTextButton('Login');
        //     setHidden('text');
        // }

        
    }
    const handleLogout = () => {
        setToken(null);
    };

    const value = {
        token,

        //textButton,
        //phoneNumber,setPhoneNumber,
        //hidden, setHidden,
        //otp,setOtp,
        params, seParams,
        onLogin2: handleLogin2,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };
    console.log('line 49', value);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return React.useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/home" replace state={{ from: location }} />;
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <h1>React Router</h1>

            <Navigation />

            <Routes>
                <Route index element={<Home2 />} />
                <Route path="home" element={<Home2 />} />
                <Route path="login" element={<Login />} />
                <Route path="login2" element={<Login2 />} />
                {/* <Route element={<ProtectedRoute/>}>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='admin' element={<Admin />}/>
        </Route> */}
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
    );
};

const Navigation = () => {
    const { token, onLogout } = useAuth();

    return (
        <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/login2">Loadable Login</NavLink>

            {token && (
                <button type="button" onClick={onLogout}>
                    Sign Out
                </button>
            )}
        </nav>
    );
};

const Home = () => {
    const { onLogin } = useAuth();

    return (
        <>
            <h2>Home (Public)</h2>

            <button type="button" onClick={onLogin}>
                Sign In
            </button>
        </>
    );
};

const Login = () => {
    // const { onLogin2, phoneNumber, setPhoneNumber,otp, setOtp, textButton,hidden, setHidden } = useAuth();
    const {params, seParams,onLogin2,} = useAuth();
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
                                        <Form  onSubmit={(event) => {
                                            event.preventDefault();
                                            onLogin2(params)
                                            }}>
                                            <Form.Group className="mb-3 form-custom" controlId="formBasicEmail">
                                                <Form.Control type="text" placeholder="Wa number" name="number" required onChange={event => seParams({...params, phoneNumber :event.target.value})} />
                                                <div className="otp-form">
                                                    <Form.Control type={params.hidden} placeholder="Enter OTP Password" name="otp" maxLength="4" onChange={event => seParams({...params, otp :event.target.value})} />
                                                </div>
                                            </Form.Group>
                                            <Button variant="btn btn-primary" type="submit" >{params.textButton}</Button>
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

export default App;
