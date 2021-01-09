/**
 * Handle error response
 *
 * @param {Object} error    - response back to store
 * @param {Function} commit - store's commit function
 */
export const handleError = function(error, commit) {
  console.log('Error received:', error);
  commit('setError', error);
  commit('isLoading', false);

  return error;
}

/**
 * Determine if there was a server status error
 *
 * @param {Object} response - the server response to look at
 * @param {Function} commit - store's commit function
 * @returns {number}        - status number
 */
export const handleStatusError = function(response, commit) {
  commit('setResponseError', null);

  if (response.data && response.data.status !== 200) {
    console.log('Status error received:', response);

    let responseError = `<strong>Status Error</strong> '${response.data.status}' received.`;

    if (response.message) {
      responseError += ` <strong>Server message</strong>: ${response.message}`;
    }

    if (response.code) {
      responseError += ` <strong>Error code</strong>: ${response.code}.`;
    }

    commit('setResponseError', responseError);

    return response.data.status;
  }

  return 200;
}
