import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  //load the products into the filter context and set up filter defaults
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((item) => {
      return item.price;
    });
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, maxPrice, actualPrice: maxPrice },
    };
  }
  //set the products view to grid
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }
  //set the products view to list
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }
  //update the sort state to sort type
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  //sort by sort state type
  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let tempProducts = [...filteredProducts];
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filteredProducts: tempProducts };
  }
  //update filters in state
  if (action.type === UPDATE_FILTERS) {
    const { name: filterName, value: filterValue } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [filterName]: filterValue },
    };
  }
  //filter the products based on filters in state
  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, company, color, actualPrice, shipping, cat } = state.filters;
    let tempFiltered = [...allProducts];
    //text filter
    if (text) {
      tempFiltered = tempFiltered.filter((product) =>
        product.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }
    //company filter
    if (company !== 'all') {
      tempFiltered = tempFiltered.filter(
        (product) => product.company === company
      );
    }
    //category filter
    if (cat !== 'all') {
      tempFiltered = tempFiltered.filter((product) => product.category === cat);
    }
    if (color !== 'all') {
      tempFiltered = tempFiltered.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    //price filter
    if (actualPrice !== state.filters.maxPrice) {
      tempFiltered = tempFiltered.filter(
        (product) => product.price <= actualPrice
      );
    }
    //shipping filter
    if (shipping === true) {
      tempFiltered = tempFiltered.filter((product) => product.shipping);
    }
    console.log(`filtering products`);
    return { ...state, filteredProducts: tempFiltered };
  }
  //clear all of the filters
  if (action.type === CLEAR_FILTERS) {
    console.log(action.payload);
    return {
      ...state,
      filters: {
        ...action.payload,
        actualPrice: state.filters.maxPrice,
        maxPrice: state.filters.maxPrice,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
