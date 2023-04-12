const productInitialState = {
  loading: true,
  isLoggedIn: false,
  userData: {},
  loginLoader: false,
  registerLoader: false,
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
        userData: action.data,
      };
      case "GET_LOGIN":
        return {
          ...state,
          loginLoader: true,
        };
      case "STORE_LOGIN_SUCCESS":
        return {
          ...state,
          loginLoader: false,
        };
        case "GET_REGISTER":
          return {
            ...state,
            registerLoader: true,
          };
        case "GET_REGISTER_SUCCESS":
          return {
            ...state,
            registerLoader: false,
          };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        userData: action.data,
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
