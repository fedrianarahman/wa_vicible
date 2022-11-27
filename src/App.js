import * as React from 'react';
import './App.css';
// import "../config.json"
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
let testUrl =  require('./config.json');


const Login2 = loadable(() => import('./component2/pages2/Login-2'), {
    resolveComponent: (components) => components.Login2
});

const Home2 = loadable(() => import('./component2/pages2/Home-2'), {
    resolveComponent: (components) => components.Home2
})

const Dashboard2 = loadable(() => import('./component2/pages2/Dashboard-2'), {
    resolveComponent: (components) => components.Dashboard2
})

const Admin2 = loadable(() => import('./component2/pages2/Admin-2'), {
    resolveComponent: (components) => components.Admin2
})

// create auth contex
export const AuthContext = React.createContext(null);


const AuthProvider = ({ children }) => {
    // console.log('line 39', testUrl);

    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = React.useState(null);
    // const [storedValue, setValue] = useLocalStorage();
    
    // console.log('line 67', storedValue);
    //const [phoneNumber, setPhoneNumber] = React.useState()
    //const [textButton, setTextButton] = React.useState("Request OTP")
    //const [otp, setOtp] = React.useState()
    //const [hidden, setHidden] = React.useState('hidden');
    const [params, seParams] = React.useState({ hidden: 'hidden', textButton: "Request OTP", phoneNumber: '', otp: '', textFeedBack : '',feedBackType  : 'invalid', isDisabled : false, colorText : "text-danger"});
    
    ///cek token storage
    const cekToken = window.localStorage.getItem("token");
    // console.log(cekToken);
    // if (cekToken) {
    //     console.log("line 77", cekToken)
    //     //setToken(cekToken);
    //     //const origin = location.state?.from?.pathname || '/home2';
    //     //navigate(origin);
    // } else {
    //     //redirect to login
    // }

    const handleLogin2 = async (param) => {
       
        
        // alert(phone);
        const phoneNumber = param.phoneNumber;
        const otp = param.otp;
        // if (phoneNumber <=9) {
        //     alert('1');
        //     return false;
        // }else if(phoneNumber <= 9){
        //     alert('harpa input nomor yang benar');
        // }
        if (param.otp) {
            let urlLogin = `${testUrl.host}/wa/login-by-otp`;
            // console.log('line 43', testUrl.host);
            let otpSend = await axios.post(urlLogin, { phoneNumber, otp });
            // console.log('line 77', otpSend)
            if (otpSend.data.status=="error") {
                alert('otp tidak ditemukan');
                seParams({...params,  hidden: 'hidden', textButton: "Request OTP", phoneNumber: phoneNumber, otp: '', textFeedBack : '',feedBackType  : 'invalid', isDisabled : false, colorText : "text-danger"});
                return false;
            } else {
                seParams({...params, otp : ''})
                console.log('line 82',otpSend.data); 
                const token = otpSend.data.data;
                setToken(token);
                window.localStorage.setItem("token", token);
                const origin = location.state?.from?.pathname || '/home2';
                navigate(origin);
            }
        } else {
            let url = `${testUrl.host}/wa/request-otp`
            // console.log('line 43', url);
            let res = await axios.post(url, { phoneNumber });
            // console.log('line 87', res.data);
            if (res.data.status=="error") {
                seParams({...params, textFeedBack : res.data.message, feedBackType : 'text', isDisabled: true, colorText : "text-danger" });
                return false
            } else {
                
                const changeText = params.textButton = "Login";
                const changeType = params.hidden = "text";
                
                seParams(changeText);
                seParams(changeType);
                seParams({ ...params, hidden: "text", textButton: 'Log in',textFeedBack : res.data.status +"! Silahkan Masukan OTP", feedBackType : 'text', colorText : "text-success",  })
            }
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
        seParams({ ...params, hidden: "hidden", textButton: "Request OTP", phoneNumber: '', otp: '', textFeedBack : '' });
        window.localStorage.removeItem("token");
    };
    const setLocalToken = (token) => {
        setToken(token);
        console.log('line 132', token);       
    }
    const value = {
        token,
        setLocalToken,
        getToken : () => window.localStorage.getItem("token"),
        //textButton,
        //phoneNumber,setPhoneNumber,
        //hidden, setHidden,
        //otp,setOtp,
        params, seParams,
        onLogin2: handleLogin2,
        onLogout: handleLogout,
    };
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
    let { token,setLocalToken } = useAuth();
    const location = useLocation();

    const cekToken = window.localStorage.getItem("token");
// console.log("line 152",cekToken);
    if(cekToken){
        token = cekToken;
        //setLocalToken(token)
    }
    if (!token) {
        return <Navigate to="/login2" replace state={{ from: location }} />;
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>


            <Routes>
                <Route index element={<Login2 />} />
                <Route path="login2" element={<Login2 />} />
                <Route path="home2" element={<ProtectedRoute><Home2 /></ProtectedRoute>} />

                {/* <Route path="home2" element={<Home2 />} /> */}
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard2 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute>
                            <Admin2 />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NoMatch />} />
            </Routes>
        </AuthProvider>
    );
};

const NoMatch = () => {
    return <p>There's nothing here: 404!</p>;
};

export default App;