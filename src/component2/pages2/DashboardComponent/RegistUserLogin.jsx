import React from 'react'
import { Card, Form, Button, Row } from 'react-bootstrap'
const RegistUserLogin = () => {
  return (
                    <Card>
                        <Card.Header as="h5" className="card-header">Pendaftaran Nomor User Login</Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                <Form.Group className="col col-md-4">
                                <Form.Label>Nomor </Form.Label>
                                <Form.Control type="text"  className="input-custom" />
                                </Form.Group>
                                <Form.Group className="col col-md-4">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text"  className="input-custom"/>
                                </Form.Group>
                                <Form.Group className="col col-md-4">
                                <Button variant="success" className="btn-request-otp" size="sm">Request OTP</Button>{' '} 
                                </Form.Group>
                                </Row>
                                
                            </Form>
                        </Card.Body>
                        </Card>
  )
}

export default RegistUserLogin