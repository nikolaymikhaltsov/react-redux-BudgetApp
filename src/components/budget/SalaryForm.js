import React, {PropTypes} from 'react';

const SalaryForm = ({
  onChangeState,
  onUpdate,
  salary
}) => {

  return (
    <form className="form-inline">
      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          name="salary"
          value={salary}
          className="form-control"
          onChange={onChangeState}/>
      </div>
      &nbsp;
      <input
        type="submit"
        value="Update"
        className="btn btn-primary"
        onClick={onUpdate}/>
    </form>
  );
};

SalaryForm.propTypes = {
  onChangeState: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  salary: PropTypes.number.isRequired
};

export default SalaryForm;
