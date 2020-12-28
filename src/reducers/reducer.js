export const initialState = {
  user: null,
  users: [],
  tourPackages: [],
  places: [],
  cart: [],
};

export const getPackageTotal = (packageItem) => {
  let total = 0;
  packageItem.forEach((i) => {
    total += parseFloat(i.precio);
  });
  return total.toFixed(2);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PLACES":
      return {
        ...state,
        places: [...state.places, action.places],
      };
    case "SET_PACKAGES":
      return {
        ...state,
        tourPackages: [...state.tourPackages, action.tourPackages],
      };
    case "MODIFY_PACKAGES":
      const stateArray = [...state.tourPackages];
      const index = stateArray.findIndex(
        (tourItem) => tourItem.id === action.tourPackages.id
      );
      if (index !== -1) {
        stateArray[index] = action.tourPackages;
      }
      return {
        ...state,
        tourPackages: stateArray,
      };
    case "ADD_CART":
      return {
        ...state,
        cart: [...state.cart, action.cartItem],
      };
    case "EMPTY_CART":
      console.log(action);
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default reducer;

// switch (action.type) {
//   case "SET_USER":
//     //For an array of objects
//     state = [...state];
//     state.push(action.user);
//     return state;

//   ////For one object
//   // return {
//   //   ...state,
//   //   user: action.user,
//   // };

//   default:
//     return state;
// }
