
import React from 'react'
import { AuthContext } from "../../App";
import { MainPanel } from './MainPanel';
export const Home2 = () => {
    const  token  = React.useContext(AuthContext).getToken();
    return (
        <MainPanel>
            <div>Halaman Home token adalah {token}</div>
        </MainPanel>
    )
}
