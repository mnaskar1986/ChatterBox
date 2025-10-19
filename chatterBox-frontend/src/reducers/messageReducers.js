import {
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAILURE,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAILURE,
} from "../constants/messageActionConstants";

export const messageSendReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_SEND_REQUEST:
      return { loading: true };
    case MESSAGE_SEND_SUCCESS:
      return { loading: false, success: action.payload };
    case MESSAGE_SEND_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const messageListReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST:
      return { loading: true };
    case MESSAGE_LIST_SUCCESS:
      return { loading: false, success: true, messages: action.payload  };
    case MESSAGE_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
