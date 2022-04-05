// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email) => ({ type: ADD_EMAIL, email });

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

function requestCurrencies() {
  return { type: REQUEST_CURRENCIES };
}

function getCurrencies(json) {
  return { type: GET_CURRENCIES, payload: json };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await response.json();
      return dispatch(getCurrencies(json));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
} // action da API
