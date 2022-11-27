import React from 'react'
import { Component } from 'react'
import { Modal, Form, Row, Button } from 'react-bootstrap';
import { ApiService } from '../../../apiService';
import { decodeToken } from 'react-jwt';
let config = require('../../../config.json');
let tokenData = decodeToken(window.localStorage.getItem("token"));
class AddData2 extends Component {

    constructor(props) {
        super(props)
        console.log("line 10 props.dataApi", this.props.dataApi)

        this.state = {
            form: { ...this.props.dataApi, uid_sekolah: tokenData.id }
        }
    }
    handleChange = (event) => {
        event.preventDefault()
        let nama = event.target.name;
        let value = event.target.value;
        let form = { ...this.state.form }
        form[nama] = value
        this.setState({ form })
    }
    saveData = async (event) => {
        event.preventDefault()
        console.log('line 27', this.state.form)
        this.props.onHide()
        // alert('dwdwwd');
        if (this.state.form.id) {
            // console.log('line 32 ',`${this.state.form.nomorTujuan} ${this.state.form.id} ${this.state.form.message} ${this.state.form.harga},${this.state.form.sendStatusDate}`);
            let form = { ...this.state.form }
            if (!form.sendStatusDate || form.sendStatusDate == null) form.sendStatusDate = 0;

            let updateData = await ApiService.post(`/wa/outbox-save`, form);
            console.log('line 34', updateData.data);
            if (updateData.data.status == "success") {
                alert('data berhasil diubah')
            }

        } else {

            let addData = await ApiService.post(`/wa/outbox-save`, this.state.form);
            console.log('line 38', addData.data);
        }

    }
    render() {
        // console.log('line 29', this.state.form.nomorTujuan)
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title >{this.props.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                            <>
                                <Form.Group className='col col-md-6'>
                                    <Form.Label>Nomor Tujuan</Form.Label>
                                    <Form.Control type='text' name='nomorTujuan' required onChange={this.handleChange} defaultValue={this.state.form.nomorTujuan} />
                                </Form.Group>

                                <Form.Group className='col col-md-6'>
                                    <Form.Label>Harga</Form.Label>
                                    <Form.Control type='text' name='harga' required onChange={this.handleChange} defaultValue={this.state.form.harga} />
                                </Form.Group>


                                <Form.Group className='col col-md-12'>
                                    <Form.Label>Pesan</Form.Label>
                                    <Form.Control as="textarea" placeholder="Leave a comment here"
                                        style={{ height: '100px', fontSize: '12px' }}
                                        required
                                        name='message'
                                        onChange={this.handleChange}
                                        defaultValue={this.state.form.message}
                                    />
                                </Form.Group>
                            </>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="warning" type="submit" onClick={this.saveData}>
                        {this.props.textBtn}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddData2