import get from 'lodash/get';
/**
 * @param {object} queryObject
 * @param {object} queryObject.filter
 * @param {object} queryObject.sort
 * @param {string} queryObject.sort.field field name
 * @param {string: descend || ascend} queryObject.sort.order sort direction
 * @param {object} queryObject.pagination
 * @param {int} queryObject.pagination.pageSize item per page
 * @param {int} queryObject.pagination.current page number
 * @returns {object} object to integrate with API that support pagination
 */
const getPaginationParams = ({ filter = {}, sort, pagination = {} } = {}) => {
  const { dateRange, transferTo, ...othersFilter } = filter;
  const fromDate = get(dateRange, '[0]');
  const toDate = get(dateRange, '[1]');

  othersFilter.fromDate = fromDate;
  othersFilter.toDate = toDate;

  if (transferTo) {
    const { sendTo, bankId } = transferTo;

    othersFilter.sendTo = sendTo;
    othersFilter.bankId = bankId;
  }

  let formattedSort;
  if (sort && sort.order) {
    formattedSort = {
      field: sort.field,
      order: sort.order === 'descend' ? 'desc' : 'asc',
    };
  }
  const output = {
    filter: othersFilter,
    pageSize: pagination.pageSize,
    page: pagination.current,
    sort: formattedSort,
    fromDate,
    toDate,
  };
  return output;
};

export default getPaginationParams;
