import _ from 'lodash';

export function getPercentFromSalary(value, salary) {
  if (!salary)
    return '';
  return parseFloat((value / salary * 100).toFixed(1));
}

export function sortItemsByProperty(items, prop) {
  return _.sortBy(items, prop);
}
