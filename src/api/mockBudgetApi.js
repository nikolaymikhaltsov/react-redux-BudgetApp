const delay = 200;// to emulate API calls delay

const budgetItems = [
  {
    id: "1",
    name: "Travel to Italy",
    cost: 1700,
    group: "Traveling"
  },
  {
    id: "2",
    name: "Ticket to cinema",
    cost: 50,
    group: "Tickets"
  },
  {
    id: "3",
    name: "Meal in McDonald’s",
    cost: 130,
    group: "Meal"
  }
];

const generateId = () => {
  return 'id' + (new Date()).getTime();
};

class BudgetApi {
  static getAllBudgetItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], budgetItems));
      }, delay);
    });
  }

  static saveBudgetItem(budgetItem) {
    budgetItem = Object.assign({}, budgetItem);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (budgetItem.id) {
          const existingItemIndex = budgetItems.findIndex(a => a.id == budgetItem.id);
          budgetItems.splice(existingItemIndex, 1, budgetItem);
        } else {

          budgetItem.id = generateId();
          budgetItems.push(budgetItem);
        }

        resolve(budgetItem);
      }, delay);
    });
  }

  static deleteBudgetItem(itemToDelete) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfItemToDelete = budgetItems.findIndex(item => { item.id == itemToDelete.id; });
        budgetItems.splice(indexOfItemToDelete, 1);
        resolve(itemToDelete);
      }, delay);
    });
  }
}

export default BudgetApi;
