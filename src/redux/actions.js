import * as type from './constants';

import axios from 'axios';

export function getProducts() {
    return dispatch => {
      dispatch({ type: type.GET_PRODUCTS });
      axios.get('http://localhost:8008/products').then(response => {
        dispatch({ type: type.STORE_PRODUCTS, data: response.data.data  });
      }).catch(err => console.log(err));
    };
  }