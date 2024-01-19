// Import deps
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteUI {
  buttonText: string;
  confirmText: string;
  id: number;
  all: boolean;
  handleDelete: (all: boolean, id: number) => void;
}

// Create list component
export const ConfirmDelete = (props: DeleteUI) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleCancel = () => setShow(false);
  const handleConfirm = () => {
    console.log("confirm deleted")
    setShow(false);
    props.handleDelete(props.all, props.id);
  }

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        {props.buttonText}
      </Button>

      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.confirmText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}