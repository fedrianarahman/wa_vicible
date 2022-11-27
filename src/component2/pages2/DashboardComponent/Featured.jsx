import {  decodeToken } from 'react-jwt';
import axios from 'axios';
import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { useEffect } from 'react';
import { ApiService } from '../../../apiService';
let config = require('../../../config.json');
const Featured =  () => {
        // membuat state untuk data 
        const [datas, setData] = React.useState({
            phoneNumber : '',
            nama : '',
            saldo : '',
            statusLogin : ''
        })

        useEffect(()=>{
            fetchData();
        }, [])
        
        const fetchData = async () =>{
             // mengambil dan mengecek token dari local storage
        const cekToken = window.localStorage.getItem("token");
        // mendecode token yang di hash 
        const token = decodeToken(cekToken);
        // console.log('line 26 featured', token);
        // membuat parameter header
         const localConfigAxios = {
        headers: { 
            'Authorization': `Bearer ${cekToken}`, 
          },
        }   
        // console.log(localConfigAxios.headers)
        // menembak api
            //  axios.post(`${config.host}/wa/get-user-wa`, token, localConfigAxios)
        // const response = await axios.post(`${config.host}/wa/get-user-wa`, token, localConfigAxios)
        const response = await ApiService.post(`/wa/get-user-wa`,token);
        // console.log('featured jsx line 37', response.data)
        // const response1 = await ApiService.post(`${config.host}/wa/get-state-server`,token)
        // console.log('line 37', response1.data.data);
        // console.log('line 26');
            // .then(res => {
            //     console.log('line 23',res);whatsappNumber

            // });
        const data = response.data.data.nama;
        // console.log('line 35', data);
        
        setData({...datas, nama : response.data.data.nama, phoneNumber : response.data.data.whatsappNumber, saldo : response.data.data.saldoTopup,});
        }

       
        
  return (
    <Card  variant="warning">
                   <Card.Header as="h5" className="card-header">Featured</Card.Header>
                   <Card.Body>
                        {/* <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                        </Card.Text> */}
                         <Table size="sm">
                            <thead>
                                <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                <td>Nomor Wa :</td>
                                <td>{datas.phoneNumber}</td>
                                </tr>
                                <tr>
                                <td>Nama : </td>
                                <td>{datas.nama}</td>
                                </tr>
                                <tr>
                                <td>status : </td>
                                <td><button type="button" className="btn-custom"  >
                                    Cek
                                </button></td>
                                </tr>
                                <tr>
                                <td>saldo : </td>
                                <td><button type="button" className="btn-light"  >
                                    {datas.saldo}
                                </button></td>
                                </tr>
                            </tbody>
                            </Table>
                    </Card.Body>
                    </Card>
  )
}

export default Featured