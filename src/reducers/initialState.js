export default {
  budgetItems: [],
  defaults: {
    salary: 1000,
    defaultSortedProperty: "cost",
    groups: ['Traveling', 'Shopping', 'Tickets', 'Meal' ],
    itemProperties: [
      {id: "name", description: 'Name'},
      {id: "cost", description: 'Cost'},
      {id: "prcnt", description: '% from Salary'},
      {id: "group", description: 'Group'}
    ]
  }
};
