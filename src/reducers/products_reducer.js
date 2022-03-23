import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  CLEAR_SINGLE_PRODUCT_ERROR,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return {
      ...state,
      productsLoading: true,
      productsError: false,
    };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (item) => item.featured === true
    );
    return {
      ...state,
      productsLoading: false,
      products: action.payload,
      featuredProducts: featured_products,
    };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, productsLoading: false, productsError: true };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, singleProductLoading: true, singleProductError: false };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      singleProduct: action.payload,
      singleProductLoading: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, singleProductLoading: false, singleProductError: true };
  }
  if (action.type === CLEAR_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      singleProductError: false,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
