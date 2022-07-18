import { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

function paramsToObject(queryString) {
  const URLParam = new URLSearchParams(queryString);

  const result = {};
  for (let [key, value] of URLParam) {
    // each 'entry' is a [key, value] tupple
    try {
      value = JSON.parse(value);
    } catch (e) {}
    result[key] = value;
  }
  return result;
}

const generateQueryString = (paramObject) => {
  const params = [];

  for (let key in paramObject) {
    const value = paramObject[key];

    if (!isEmpty(value)) {
      params.push(`${key}=${JSON.stringify(value)}`);
    }
  }
  return params.join('&');
};

/**
 * @param {any} defaultQuery initial value of query
 * @returns {Array} [query, setQuery] query is an query object.
 * setQuery is a function receive a new object query then navigate to it.
 */
const useRouterQuery = (defaultQuery = {}) => {
  const history = useHistory();
  const location = useLocation();

  const queryObject = useMemo(() => {
    let paramObject = paramsToObject(location.search);

    if (isEmpty(paramObject)) {
      paramObject = defaultQuery;
    }

    return paramObject;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const setQuery = useCallback(
    (newQuery) => {
      let query = generateQueryString(newQuery);

      if (query) {
        query = '?' + query;
      }
      history.push({
        pathname: location.pathname,
        search: query,
      });
    },
    [history, location.pathname],
  );

  return [queryObject, setQuery];
};
export default useRouterQuery;
