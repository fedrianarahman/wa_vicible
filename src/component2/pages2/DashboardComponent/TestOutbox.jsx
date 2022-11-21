import { Component } from "react";
import { Card, Form, Table, Pagination, Row, Button, Modal } from 'react-bootstrap';
import AddData from "./AddData";
import DetailData from "./DetailData";
class TestOutBox extends Component{
    constructor(){
        super();
        this.state = {
            jenis : '',
            tanggal1 : '',
            tanggal2 : '',
            label1 : '',
            label2 : '',
            typeForm : '',
            show : false,
            datas : [],

        }
    }

    // modal add data 
    handleAddData = () =>{
        this.setState({show : true})
    }
    // modal detail data
    handleDetailData = () =>{
        // this.setState({show : true})
        return(
            alert('detail data')
        )
    }
    // modal close add  data
    handleClose = () =>{
        this.setState({show : false})
    }
    // event change handler
    handleChange = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name] : value});
    }

    // function handleSubmit
    handleSubmit = (event)=>{
        event.preventDefault();
        console.log('line 27', this.state.jenis);
        console.log('line 28', this.state.tanggal1);
        console.log('line 29', this.state.tanggal2);
    }

    render(){
        //     const cek = this.handleAddData;
        //     const cekShow = this.handleDetailData;
        //     let cekDetail;
        //     let cekData;
        //    if (cek) {
        //     cekData = <AddData show={this.state.show} handleClose={this.handleClose}/>
        //    }else if(cekShow){
        //     cekDetail = <DetailData show={this.state.show} handleClose={this.handleClose}/> 
        //    }
        if (this.handleAddData) {
            return(
                <DetailData show={this.state.show} handleClose={this.handleClose}/>
            )
        }
       let cekAdd = <AddData show={this.state.show} handleClose={this.handleClose}/>

         return(
            
            <>
            {cekAdd}
                 {/* <AddData show={this.state.show} handleClose={this.handleClose}/>     */}
            <Card>
                <Card.Header>
                <h5>Outbox</h5>
                <button className='btn-add-data' onClick={this.handleAddData}>Add Data</button>
                <button className='btn-add-data' onClick={this.handleDetailData}>Cek Data </button>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Form.Group className="col col-md-3">
                                <Form.Label>Jenis</Form.Label>
                                <Form.Select name="jenis" onChange={this.handleChange}>
                                    <option value="1">Terkirim</option>
                                    <option value="0">Antrian</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="col col-md-3">
                                <Form.Label>Tanggal 1</Form.Label>
                                <Form.Control type="date" name="tanggal1" className="input-custom" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="col col-md-3">
                                <Form.Label>Tanggal 2</Form.Label>
                                <Form.Control type="date" name="tanggal2" className="input-custom" onChange={this.handleChange}/>
                            </Form.Group>
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
                                 
                             </tbody>
                             </Table>
                </Card.Body>
            </Card>
            </>
        )
    }
}
export default  TestOutBox;