import React from 'react'
import { Card, Button } from 'react-bootstrap'
const WaMenu = () => {
  return (
    <Card>
    <Card.Header as="h5" className="card-header">WA Menu</Card.Header>
    <Card.Body>
    <Button variant="warning" size="sm">Restart WA</Button>{' '}
    <Button variant="success" size="sm">Scan QR</Button>{' '}
    </Card.Body>
    </Card>
  )
}

export default WaMenu