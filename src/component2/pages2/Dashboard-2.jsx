import { Card, Container, Row, Table, Button, Form,Pagination } from "react-bootstrap";
import './styles/Dashboard-2.css';
import React from "react";
import { AuthContext } from "../../App";
import { MainPanel } from "./MainPanel";
import Featured from "./DashboardComponent/Featured";
import WaMenu from "./DashboardComponent/WaMenu";
import QrCode from "./DashboardComponent/QrCode";
import Outbox from "./DashboardComponent/Outbox";
import RegistUserLogin from "./DashboardComponent/RegistUserLogin";
import TestOutBox from "./DashboardComponent/TestOutbox";
 export const Dashboard2 = () => {
    const  token  = React.useContext(AuthContext).getToken();
    return (
        <>
        <MainPanel>
            {/* <h2>Dashboard (Protected)</h2>

            <div>Authenticated as {token}</div> */}
            <Container>
                <Row>
                    <div className="col col-md-3">
                    {/* featured */}
                    <Featured />
                    <div className=" mt-4">
                   <WaMenu />
                    </div>
                    <div className=" mt-4">
                    <QrCode />
                    </div>
                    </div>
                    <div className="col col-md-9">
                        <RegistUserLogin />
                        <div className="outbox">
                        <Outbox/>
                        </div>
                    </div>
                </Row>
            </Container>
        </MainPanel>
        </>
    );
};