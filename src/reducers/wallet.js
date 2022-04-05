import { GET_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    delete action.payload.USDT;
    return { ...state, currencies: Object.keys(action.payload) };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  default:
    return state;
  }
}

export default wallet;
