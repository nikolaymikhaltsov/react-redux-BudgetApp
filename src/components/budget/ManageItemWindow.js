import React, {PropTypes} from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ManageItemWindow = ({isOpen, budgetItem, groups, onSave, onChange, onClose, errors}) => {

  return(
    <Modal isOpen={isOpen} onRequestHide={onClose}>
      <ModalHeader>
        <ModalClose onClick={onClose}/>
        <ModalTitle>{budgetItem.id ? 'Edit Item' : 'Create New Item'}
          </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form>
          <TextInput
            name="name"
            label="Name"
            value={budgetItem.name}
            onChange={onChange}
            error={errors.name}/>

          <TextInput
            name="cost"
            label="Cost"
            value={budgetItem.cost}
            onChange={onChange}
            error={errors.cost}/>

          <SelectInput
            name="group"
            label="Group"
            value={budgetItem.group}
            defaultOption="Select Group"
            options={groups}
            onChange={onChange}
            error={errors.group}/>
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-default" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={onSave}>
          {budgetItem.id ? 'Update' : 'Create'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

ManageItemWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  budgetItem: PropTypes.object.isRequired,
  groups: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default ManageItemWindow;
