
import React from "react";
import { AuthContext } from "../../App";
import { MainPanel } from "./MainPanel";
export const Admin2 = () =>{

    const { token } = React.useContext(AuthContext);
    return (
        <>
        <MainPanel>
            <h2>Admin (Protected)</h2>
            <div>Authenticated as {token}</div>
            </MainPanel>
        </>
    );
}