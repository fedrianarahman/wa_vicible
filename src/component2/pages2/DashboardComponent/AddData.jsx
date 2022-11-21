import React from 'react'
import { useState } from 'react'
import { Modal, Form, Row, Button } from 'react-bootstrap';
import { ApiService } from '../../../apiService';
import {  decodeToken } from 'react-jwt';
let config = require('../../../config.json');

const AddData = (props) => {
    let tokenData = decodeToken(window.localStorage.getItem("token"));
    
    const [show, setShow] = useState(false);

    const handleShow = () =>{
        setShow(true);
    }
    const handleClose = () =>{
        setShow(false);
    }
    const [params, setParams] = useState({
        uid_sekolah : tokenData.id,
        harga  :100,
        // nomorTujuan : '',
        // tglKirim : '',
        // harga : '',
        // pesan : '',
        // id : '',
        // uid_sekolah 
    })
    const saveData = async () =>{
       
        // let cekId = window.localStorage.getItem("token");
        // console.log('line 18', cekId);
        // let uid_sekolah = decodeToken(cekId).id;
        // setParams({...params, uid_sekolah : uid_sekolah})
        let req = await ApiService.post(`${config.host}/wa/outbox-save`, params);
        console.log(req);
       
        // console.log('line 31', req.data);
        // console.log('line 38', id);
    }

    // const editData = async (id) =>{
    //     let cekId = window.localStorage.getItem("token");
    //     console.log('line 18', cekId);
    //     let uid_sekolah = 23;
    //     let nomorTujuan = params.nomorTujuan;
    //     let harga = params.harga;
    //     let message = params.pesan;
    //     console.log('line 47', id)
    //     let reqEdit = await ApiService.post(`${config.host}/wa/outbox-save`, {})
    // }
        return (
            <Modal show={props.show} onHide={props.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title >{props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Row>
                            <>
                                <Form.Group className='col col-md-6'>
                                <Form.Label>Nomor Tujuan</Form.Label>
                                <Form.Control type='text' required onChange={(e) =>{setParams({...params, nomorTujuan : e.target.value})}} defaultValue={props.dataApi.nomorTujuan}/>
                                </Form.Group>
                                <Form.Group className='col col-md-6'>
                                <Form.Label></Form.Label>
                                <Form.Control type='hidden' required onChange={(e) =>{setParams({...params, id: e.target.value})}} defaultValue={props.dataApi.id}/>
                                </Form.Group>
                                <Form.Group className='col col-md-12'>
                                <Form.Label>Pesan</Form.Label>
                                 <Form.Control as="textarea"placeholder="Leave a comment here"
                                            style={{ height: '100px', fontSize: '12px' }}
                                            required
                                            onChange={(e) =>{setParams({...params, message : e.target.value})}}
                                            defaultValue={props.dataApi.message}
                                            />
                                </Form.Group>
                                 </>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" type="submit"  onClick={() => {
                            saveData()
                            // editData()
                            props.handleClose()
                        }}>
                            {props.txtBtn}
                        </Button>
                    </Modal.Footer>
                </Modal>
          )
    }


export default AddData