import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userLogoutReducer,
  userListReducer,
  userDetailsReducer,
  userDeleteReducer,
  userRegisterReducer,
  userDetailsUpdateReducer,
} from "./reducers/userReducers";

// import {
//   addCategoryReducer,
//   listCategoriesReducer,
//   fetchCategoryDetailsReducer,
//   deleteCategoryReducer,
//   updateCategoryReducer
// } from "./reducers/categoryReducers";

import {
  createChannelReducer,
  listChannelReducer,
  joinChannelReducer,
  fetchChannelDetailsReducer,
} from "./reducers/channelReducers";

import {
  messageSendReducer,
  messageListReducer,
} from "./reducers/messageReducers";

// import {
//   placeOrderOfUserReducer,
//   getUserOrdersHistoryReducer,
//   getAllUsersOrderHistoryReducer,
//   changeUserOrderStatusReducer,
// } from "./reducers/orderActionsReducers";

const reducer = combineReducers({
  login: userLoginReducer,
  logout: userLogoutReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  userRegister: userRegisterReducer,
  channelCreate: createChannelReducer,
  channelList: listChannelReducer,
  channelJoin: joinChannelReducer,
  channelDetails: fetchChannelDetailsReducer,
  messageSend: messageSendReducer,
  messageList: messageListReducer,
  // productDelete: deleteProductReducer,
  // productDetails: fetchProductDetailsReducer,
  // productDetailsUpdate: updateProductDetailsReducer,
  // fetchUserCart: fetchUserCartReducer,
  // saveProductToUserCart: saveProductToUserCartReducer,
  // deleteProductFromUserCart: deleteProductFromUserCartReducer,
  // placeOrderOfUser: placeOrderOfUserReducer,
  // getUserOrdersHistory: getUserOrdersHistoryReducer,
  // getAllUsersOrderHistory: getAllUsersOrderHistoryReducer,
  // changeUserOrderStatus: changeUserOrderStatusReducer,
});

const userInfoFromSessionStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

const channelsFromLocalStorage = localStorage.getItem("channels")
  ? JSON.parse(localStorage.getItem("channels"))
  : null;

const messagesFromLocalStorage = localStorage.getItem("messages")
   ? JSON.parse(localStorage.getItem("messages"))
  : null;

// const cartFromLocalStorage = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : null;

 const initialState = {
   login: { userInfo: userInfoFromSessionStorage },
   //listChannels: {},
   channels: channelsFromLocalStorage,
  //  cart: cartFromLocalStorage,
 };
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;