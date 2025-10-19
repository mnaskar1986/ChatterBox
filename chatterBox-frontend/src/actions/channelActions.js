import axios from "axios";
import { BACKEND_URL_ENDPOINT, GET_ALL_CHANNELS_API } from "../constants/backend";

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
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAILURE,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAILURE,
} from "../constants/channelActionConstants";

export const createChannel = 
(name, description, createdBy) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CHANNEL_REQUEST,
    });
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };
    await axios
      .post(BACKEND_URL_ENDPOINT + "channels/", 
        {name, description, createdBy},
        config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: CREATE_CHANNEL_SUCCESS,
            payload: res.data.message,
            success: "Channel created successfully",
          });
        } else {
          dispatch({
            type: CREATE_CHANNEL_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: CREATE_CHANNEL_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const joinChannel =
  (channelId, userId) => async (dispatch) =>{
    try {
      dispatch({
        type: JOIN_CHANNEL_REQUEST,
      });
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
      await axios
        .put(GET_ALL_CHANNELS_API+ '/' + `${channelId}`,
           { channelId, userId },
           config)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            dispatch({
              type: JOIN_CHANNEL_SUCCESS,
              payload: res.data.data,
            });
          } else {
            dispatch({
              type: JOIN_CHANNEL_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: JOIN_CHANNEL_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

  export const listChannels = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_CHANNEL_REQUEST,
    });

    const channelInfo = JSON.parse(sessionStorage.getItem("channelInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .get(GET_ALL_CHANNELS_API, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: LIST_CHANNEL_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: LIST_CHANNEL_FAILURE,
            payload: 'Not able to fetch the channels',
          });
        }
      });
  } catch (err) {
    dispatch({
      type: LIST_CHANNEL_FAILURE,
      payload: 'Not abl to fetch the channels',
    });
  }
};

export const fetchChannelDetails = 
(channelId) => async (dispatch) => {
  try {
    dispatch({
      type: DETAILS_CHANNEL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .get(GET_ALL_CHANNELS_API+ '/' + `${channelId}`, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ 
            type: DETAILS_CHANNEL_SUCCESS, 
            payload: res.data.data,
            success: 'Fetched channel details successfully',
           });
        } else {
          dispatch({ type: DETAILS_CHANNEL_FAILURE, payload: res.data.message });
        }
      });
  } catch (err) {
    dispatch({
      type: DETAILS_CHANNEL_FAILURE,
      payload: err.response.data.message,
    });
  }
};
export const sendMessage =
  (content, channelId, userId) =>
  async (dispatch) => {
    try {
      dispatch({
        type: MESSAGE_SEND_REQUEST,
      });

      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      const userId = userInfo._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
      await axios
        .post(GET_ALL_CHANNELS_API+ '/' + `${channelId}` + '/message',
          { content, userId, channelId},
          config
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch({
              type: MESSAGE_SEND_SUCCESS,
              payload: res.data.message,
            });
          } else {
            dispatch({
              type: MESSAGE_SEND_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: MESSAGE_SEND_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

  export const listMessages = 
  (channelId) => async (dispatch) => {
    try {
      dispatch({
        type: MESSAGE_LIST_REQUEST,
      });
  
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
  
      await axios
        .get(GET_ALL_CHANNELS_API+ '/' + `${channelId}` + '/messages',
          { channelId }, 
          config)
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: MESSAGE_LIST_SUCCESS,
              payload: res.data.data,
            });
          } else {
            dispatch({
              type: MESSAGE_LIST_FAILURE,
              payload: 'Not able to fetch the messages',
            });
          }
        });
    } catch (err) {
      dispatch({
        type: MESSAGE_LIST_FAILURE,
        payload: 'Not abl to fetch the messages',
      });
    }
  };
