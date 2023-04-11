const productInitialState = {
  loading: true,
  isLoggedIn: false,
  ueserData: {},
};

const productReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case "GET_AUTH":
      return {
        ...state,
        loading: true,
      };
    case "STORE_AUTH":
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        ueserData: action.data,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        ueserData: action.data,
        isLoggedIn: false,
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        otpLoader: false,
      };
    default:
      return state;
  }
};

export default productReducer;
