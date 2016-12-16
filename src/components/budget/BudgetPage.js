import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as budgetActions from '../../actions/budgetActions';
import ManageItemWindow from './ManageItemWindow';
import DataTable from './DataTable';
import SalaryForm from './SalaryForm';

class BudgetPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sortingProperty: this.props.sortingProperty,
      salary: this.props.salary,
      isOpen: false,
      budgetItem: this.props.emptyItem,
      errors: {}
    };

    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.openModalForEdit = this.openModalForEdit.bind(this);

    this.sortItems = this.sortItems.bind(this);
    this.reverseItems = this.reverseItems.bind(this);

    this.updateBudgetItemState = this.updateBudgetItemState.bind(this);
    this.deleteBudgetItem = this.deleteBudgetItem.bind(this);
    this.saveBudgetItem = this.saveBudgetItem.bind(this);

    this.updateSalary = this.updateSalary.bind(this);
    this.updateSalaryState = this.updateSalaryState.bind(this);
  }

  showModal() {
    this.setState({isOpen: true});
  }

  hideModal() {
    this.setState({
      budgetItem: this.props.emptyItem,
      isOpen: false,
      errors: {}
    });
  }

  openModalForEdit(item) {
    this.setState({budgetItem: Object.assign({}, item), isOpen: true});
  }

  sortItems(sortByProperty) {
    this.setState({sortingProperty: sortByProperty});
    const items = this.props.items;
    this.props.actions.sortItems(items, sortByProperty);
  }

  reverseItems() {
    this.props.actions.reverseItems();
  }

  updateBudgetItemState(event) {
    const field = event.target.name;
    let budgetItem = this.state.budgetItem;
    budgetItem[field] = event.target.value;
    return this.setState({budgetItem: budgetItem});
  }

  isFormValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.budgetItem.name.length < 3){
      errors.name = 'Name must be at least 3 characters';
      formIsValid = false;
    }

    if (isNaN(this.state.budgetItem.cost) || this.state.budgetItem.cost == 0){
      errors.cost = 'Invalid value. Cost value must be a number greater than 0';
      formIsValid = false;
    }

    if (!this.state.budgetItem.group) {
      errors.group = 'Item must have a Group';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveBudgetItem(event) {
    event.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    this.props.actions.saveBudgetItem(this.state.budgetItem, this.state.salary);
    this.setState({budgetItem: this.props.emptyItem, isOpen: false});
  }

  deleteBudgetItem(item) {
    this.props.actions.deleteBudgetItem(item);
  }

  updateSalaryState(event) {
    const newSalary = parseInt(event.target.value);
    return this.setState({salary: newSalary ? newSalary : 0});
  }

  updateSalary(event) {
    event.preventDefault();
    let salary = this.state.salary;
    this.props.actions.updateSalary(salary);
  }

  render() {
    return (
      <div>
        <h1>Budget List</h1>
        <div>
          <input
            type="submit"
            value="Add Record"
            className="btn btn-primary"
            onClick={this.showModal} />
        </div>

        <ManageItemWindow
          budgetItem={this.state.budgetItem}
          groups={this.props.groups}
          isOpen={this.state.isOpen}
          onClose={this.hideModal}
          onChange={this.updateBudgetItemState}
          onSave={this.saveBudgetItem}
          errors={this.state.errors}/>

        <DataTable
          items={this.props.items}
          itemProperties={this.props.itemProperties}
          reverseItems={this.reverseItems}
          sortItems={this.sortItems}
          sortingProperty={this.state.sortingProperty}
          onEdit={this.openModalForEdit}
          deleteBudgetItem={this.deleteBudgetItem}/>

        <SalaryForm
          salary={this.state.salary}
          onChangeState={this.updateSalaryState}
          onUpdate={this.updateSalary} />
      </div>

    );
  }
}

BudgetPage.propTypes = {
  items: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  itemProperties: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  salary: PropTypes.number.isRequired,
  sortingProperty: PropTypes.string.isRequired,
  emptyItem: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const groupsFormattedForDropdown = state.budget.groups.map(group => {
    return {
      value: group,
      text: group
    };
  });

  return {
    items: state.budget.budgetItems,
    itemProperties: state.budget.itemProperties,
    emptyItem: {id: "", name: "", cost: 0, group: ""},
    salary: state.budget.salary,
    sortingProperty: state.budget.sortingProperty,
    groups: groupsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(budgetActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetPage);
