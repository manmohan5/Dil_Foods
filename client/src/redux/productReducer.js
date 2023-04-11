import * as type from "./constants";

const productInitialState = {
  products: [],
  productLoader: false,
  orderLoader: false,
  otpLoader: false,
  orders: [],
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
      case type.GET_ORDERS:
        return {
          ...state,
          orderLoader: true,
        };
      case type.STORE_ORDERS:
        return {
          ...state,
          orderLoader: false,
          orders: action.data,
        };
    case type.VERIFY_OTP:
      return {
        ...state,
        otpLoader: true,
      };
    case type.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpLoader: false,
        products: action.data,
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        productLoader: false,
        otpLoader: false,
      };
    default:
      return state;
  }
};

export default productReducer;
