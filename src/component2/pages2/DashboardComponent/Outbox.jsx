import React from 'react'
import { useState } from 'react'
import { Card, Form, Table, Pagination, Row, Button, Modal } from 'react-bootstrap';
import { ApiService } from '../../../apiService';
import moment from 'moment/moment.js'
import { BsEyeFill } from "react-icons/bs";
import 'moment/locale/es'
import DetailData from './DetailData';
import AddData from './AddData';
import DetaiData from './DetailData'
let config = require('../../../config.json');
const Outbox = () => {
    // menentukan jenis
    const [defaultJenis, setJenis] = useState("1")
    // menentukan default tanggal kesatu
    let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate())

    const [date, setDate] = useState(defaultDate)
    const onSetDate = (event) => {
        setDate(new Date(event.target.value))
    }
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const dateOne = today.setDate(today.getDate() + numberOfDaysToAdd); 
    const defaultValue = new Date(dateOne).toISOString().split('T')[0] // yyyy-mm-dd
    //modal
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState({
        title : '',
        txtBtn : ''
    })
      const handleClose = () => setShow(false);
      const handleClose1 = () => setShow(false);
     const handleShow = (dataApi) => {
         setShow(true)
         setModal({...modal, title : 'Edit Data', txtBtn  : 'Edit'})
       return(
        setSatuData(dataApi)
       )
        
     }
    
     //Handle add data
     const handleAddData = () =>{
         setShow(true)
         setSatuData({})
         setModal({...modal, title : 'Tambah data', txtBtn :'Tambah'});
     }
    // menentukan default tanggal kedua
    let defaultDate2 = new Date()
    defaultDate2.setDate(defaultDate2.getDate());
    const [date2, setDate2] = useState(defaultDate);
    const onSetDate2 = (event) =>{
        setDate2(new Date(event.target.value));
    }
    const [params, setParams] = useState({
        jenis : defaultJenis,
        tanggal1 : moment(defaultValue ).format('YYYY-MM-DD'),
        tanggal2 : moment(date2).format('YYYY-MM-DD'),
        label1 : 'Tanggal 1',
        typeForm : 'date',
        label2 : 'Tanggal 2' 
    })
    const handleLable = () =>{
        if (params.jenis =="1") {
            return(
                <>
                <Form.Group className="col col-md-3" >
                <Form.Label >{params.label1}</Form.Label>
                <Form.Control type={params.typeForm} className="input-custom" onChange={(e) =>{
                    setParams({...params, tanggal1 : e.target.value})
                }} 
                 value={params.tanggal1} defaultValue={date2.toLocaleDateString('en-CA')}/>
                </Form.Group>
                <Form.Group className="col col-md-3">
                <Form.Label>{params.label2}</Form.Label>
                <Form.Control type={params.typeForm}  className="input-custom" onChange={(e) =>{
                    setParams({...params, tanggal2 : e.target.value})
                }} value={params.tanggal2} defaultValue={date2.toLocaleDateString('en-CA')}/>
                </Form.Group>
                </>
            )
        }
    }
    const [datas, setDatas] = useState([])
    const [satuData, setSatuData] = useState({})
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const jenis = params.jenis;
        const tanggal1 = params.tanggal1;
        const tanggal2 = params.tanggal2;
        let res = await ApiService.post(`${config.host}/wa/get-outbox?limit=25&skip=0`,{ tanggal1, tanggal2,jenis});
        console.log(res);
        console.log(res.data);
       
        setDatas(res.data.data.datas);
        setSatuData(res.data.data.datas[0])     
    }
  return (
  <>
            
            <AddData show={show} handleClose={handleClose} title={modal.title} dataApi={satuData} txtBtn={modal.txtBtn}/>
            {/* <DetailData show={show}  handleClose={handleClose}/> */}
                 <Card>
                        <Card.Header  className="card-header">
                            <h5>Outbox</h5>
                            <button className='btn-add-data' onClick={handleAddData}>Add Data</button>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                <Form.Group className="col col-md-3">
                                <Form.Label>Jenis</Form.Label>
                                <Form.Select onChange={(e) => {
                                    setParams({...params, jenis : e.target.value})
                                } }>
                                <option value={"1"}>Terkirim</option>
                                <option value={"0"}>Antrian</option>
                                </Form.Select>
                                </Form.Group>
                                {handleLable()}
                                <Form.Group className="col col-md-3">
                                <Button variant="success" type='submit' className="btn-request-otp" size="sm">Cari</Button>{' '} 
                                </Form.Group>
                                </Row>
                            </Form>
                            <Table size="sm" className="mt-4 table-responsive table-bordered" >
                             
                            <thead>
                                <tr>
                                <th>Nomor</th>
                                <th>Tanggal Dibuat</th>
                                <th>Nomor Tujuan</th>
                                <th>Pesan</th>
                                <th>Harga</th>
                                <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((dataApi,index) =>{
                                    // let removeT = dataApi.sendStatusDate.split("T");
                                    let dateNew = dataApi.createdAt.substr(0,10);
                                    let time  = dataApi.createdAt.substr(11,8);
                                    return(
                                        <React.Fragment key={dataApi.id}>
                                        <tr >
                                        <td>{index+1}</td>
                                        <td>{`${dateNew} ${time}`}</td>
                                        <td >{dataApi.nomorTujuan}</td>
                                        <td>{dataApi.message}</td>
                                        <td>{dataApi.harga}</td>
                                        <td><button onClick={()=> handleShow(dataApi)}>Edit</button></td>
                                        </tr>
                                        </React.Fragment>
                                        )
                                    // <Outlet />
                                })}
                               
                                
                            </tbody>
                            </Table>
                            <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            {/* <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis /> */}

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item active>{11}</Pagination.Item>
                            <Pagination.Item >{12}</Pagination.Item>
                            {/* <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item> */}
                            <Pagination.Next />
                            <Pagination.Last />
                            </Pagination>
                        </Card.Body>
                        </Card>
                        </>
  )
}



export default Outbox