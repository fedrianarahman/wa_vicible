import axios from "axios";
import React from "react";

export const ApiService = {

    get : (url, param) =>{
        return axios.get();
    },
    post : async (url, params) =>{
        const cekToken = localStorage.getItem("token");
        const localConfigAxios = {
            headers: { 
                'Authorization': `Bearer ${cekToken}`, 
              },
            }   

        return await axios.post(url,params,localConfigAxios);
    },
}
