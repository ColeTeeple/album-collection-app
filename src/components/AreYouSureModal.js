import React from 'react'
import { Modal, Button, Stack } from 'react-bootstrap'

export default function AreYouSureModal({show, handleClose, clearLocalStorage}) {
  return (
    <Modal show={show}>
        <Modal.Header>
            <Modal.Title>Are You Sure You Want To Empty Storage?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="are-you-sure-modal-buttons">
            <Button onClick={clearLocalStorage}>Yes Empty It</Button>
            <Button onClick={handleClose}>Exit</Button>
            </div>
        </Modal.Body>
    </Modal>
  )
}
