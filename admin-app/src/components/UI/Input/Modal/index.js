import React from 'react'
import { Modal ,Button} from 'react-bootstrap'

const NewModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} size={props.size}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
              {
                props.buttons ? props.buttons.map((btn,index)=><Button key={index} variant={btn.color} onClick={btn.onClick}>
                {btn.label}
            </Button>):<Button variant="primary" {...props} style={{backgroundColor:'#333'}}className='btn-sm' onClick={props.onSubmit}>
                    Save 
                </Button>
              }
                
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal
