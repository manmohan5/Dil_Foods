import * as type from "./constants";

const productInitialState = {
  products: [],
  productLoader: false,
};

const productReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case type.GET_PRODUCTS:
      return {
        ...state,
        productLoader: true,
      };
      case type.STORE_PRODUCTS:
        return {
          ...state,
          productLoader: false,
          products: action.data,
        };
    default:
      return state;
  }
};


export default productReducer;