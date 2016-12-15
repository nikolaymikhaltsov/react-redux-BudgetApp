import React, {PropTypes} from 'react';

const DataTable = ({
  items,
  itemProperties,
  reverseItems,
  sortItems,
  sortingProperty,
  onEdit,
  deleteBudgetItem
}) => {

  return (
      <table className="table">
        <thead>
        <tr>
        {
          itemProperties.map(itemProperty => (
            <th
              key={itemProperty.id}
              style={
										sortingProperty === itemProperty.id ?
											{ fontStyle: 'italic' } :
											{ fontStyle: 'normal' }
									}
              onClick={
										() => sortingProperty !== itemProperty.id ?
											sortItems(itemProperty.id) :
											reverseItems()
									}
              >
              {itemProperty.description}
            </th>
          ))
        }
        </tr>
        </thead>
        <tbody>
        {
           items.map(item => (
             <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.cost}</td>
                <td>{item.prcnt}</td>
                <td>{item.group}</td>
               <td>
                 <input
                   type="submit"
                   value="Edit"
                   className="btn btn-primary"
                   onClick={() => onEdit(item)} />
               </td>
               <td>
                 <input
                   type="submit"
                   value="Delete"
                   className="btn btn-danger"
                   onClick={() => deleteBudgetItem(item)} />
               </td>
             </tr>
           ))
         }
        </tbody>
      </table>
  );
};

DataTable.propTypes ={
  items: PropTypes.array.isRequired,
  itemProperties: PropTypes.array.isRequired,
  reverseItems: PropTypes.func.isRequired,
  sortItems: PropTypes.func.isRequired,
  sortingProperty: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  deleteBudgetItem: PropTypes.func.isRequired
};

export default DataTable;
