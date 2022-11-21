import React from "react";
import { Navigation } from "../component/Navigation";


export const MainPanel = ({children}) =>{
    return (
        <>
        <Navigation />
        {children}
        </>
    );
}