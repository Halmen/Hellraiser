// src/utils/ApiService.js

//const API = 'http://qa.myvr.net/get_qa_layers';

// GET list of  from API
function getJson(API) {
  return fetch(`${API}`)
    .then(_verifyResponse, _handleError);
}

// GET a  detail info from API by ID
//function getDino(id) {
//  return fetch(`${API}/${id}`)
//    .then(_verifyResponse, _handleError);
//}

// Verify that the fetched response is JSON
function _verifyResponse(res) {
  let contentType = res.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json();
  } else {
    _handleError({ message: 'Response was not JSON'});
  }
}

// Handle fetch errors
function _handleError(error) {
  console.error('An error occurred:', error);
  throw error;
}

// Export ApiService
const ApiService = { getJson};
export default ApiService;