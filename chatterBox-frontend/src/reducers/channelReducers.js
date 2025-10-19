import {
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_FAILURE,
  LIST_CHANNEL_REQUEST,
  LIST_CHANNEL_SUCCESS,
  LIST_CHANNEL_FAILURE,
  JOIN_CHANNEL_REQUEST,
  JOIN_CHANNEL_SUCCESS,
  JOIN_CHANNEL_FAILURE,
  DETAILS_CHANNEL_REQUEST,
  DETAILS_CHANNEL_SUCCESS,
  DETAILS_CHANNEL_FAILURE,
} from "../constants/channelActionConstants";

export const createChannelReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHANNEL_REQUEST:
      return { loading: true };
    case CREATE_CHANNEL_SUCCESS:
      return { loading: false, success: action.payload };
    case CREATE_CHANNEL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listChannelReducer = (state = { channels: [] }, action) => {
  switch (action.type) {
    case LIST_CHANNEL_REQUEST:
      return { loading: true };
    case LIST_CHANNEL_SUCCESS:
      return { loading: false, success: true, channels: action.payload };
    case LIST_CHANNEL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const joinChannelReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_CHANNEL_REQUEST:
      return { loading: true };
    case JOIN_CHANNEL_SUCCESS:
      return { loading: false, success: true, 
        channels: action.payload };
    case JOIN_CHANNEL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchChannelDetailsReducer = (state = { channel: {} }, action) => {
  switch (action.type) {
    case DETAILS_CHANNEL_REQUEST:
      return { loading: true };
    case DETAILS_CHANNEL_SUCCESS:
      return { loading: false, success: true, channel: action.payload };
    case DETAILS_CHANNEL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
