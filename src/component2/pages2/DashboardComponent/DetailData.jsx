import React from 'react'
import { Modal, Form, Row, Button } from 'react-bootstrap'
const DetailData = (props) => {
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
                <Form>
                    <Row>
                    <>
                    <Form.Group className='col col-md-4'>
                        <Form.Label>Tanggal Kirim</Form.Label>
                        <Form.Control type='text' defaultValue={props.dataApi.createdAt}/>
                        {/* <Form.Control type='text' defaultValue={props.dataApi.createdAt}/> */}
                        </Form.Group>
                        <Form.Group className='col col-md-4'>
                        <Form.Label>Nomor Tujuan</Form.Label>
                        <Form.Control type='text' defaultValue={props.dataApi.nomorTujuan} onChange={(e) => e.target.value}/>
                        </Form.Group>
                        <Form.Group className='col col-md-4'>
                        <Form.Label>Harga</Form.Label>
                        <Form.Control type='text' defaultValue={props.dataApi.harga}/>
                        </Form.Group>
                        <Form.Group className='col col-md-12'>
                        <Form.Label>Pesan</Form.Label>
                         <Form.Control as="textarea"placeholder="Leave a comment here"
                                    style={{ height: '100px', fontSize: '12px' }}
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
                <Button variant="primary" onClick={props.handleClose}>
                    Simpan Perubahan
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailData;