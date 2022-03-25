import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  //add items to cart
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (id + color === cartItem.id) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.stock) {
            newAmount = cartItem.stock;
          }
          return { ...cartItem, amount: newAmount };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        stock: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  //change item total
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id: itemId, value: itemValue } = action.payload;
    //first find the item
    const updatedCart = state.cart.map((cartItem) => {
      //if you find the item change the amount
      if (cartItem.id === itemId) {
        let newValue = cartItem.amount + itemValue;
        //check it against stock and 0
        if (newValue < 1) {
          newValue = 1;
        }
        if (newValue > cartItem.stock) {
          newValue = cartItem.stock;
        }
        return { ...cartItem, amount: newValue };
      }
      return cartItem;
    });
    return { ...state, cart: updatedCart };
  }
  //remove from cart
  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter((cartItem) => {
      return cartItem.id !== action.payload;
    });
    return { ...state, cart: newCart };
  }
  //clear the cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  //get totals
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item;
        total.totalItems += amount;
        total.totalAmount += amount * price;
        console.log(total);
        return total;
      },
      { totalItems: 0, totalAmount: 0 }
    );

    return { ...state, totalItems, totalAmount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
