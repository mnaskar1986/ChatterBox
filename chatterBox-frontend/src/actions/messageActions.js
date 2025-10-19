import axios from "axios";
import { BACKEND_URL_ENDPOINT, GET_ALL_MESSAGES_API } from "../constants/backend";

import {
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAILURE,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAILURE,

} from "../constants/messageActionConstants";

export const sendMessage =
  (content, channelId) =>
  async (dispatch) => {
    try {
      dispatch({
        type: MESSAGE_SEND_REQUEST,
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
        .post(
          BACKEND_URL_ENDPOINT + `channels/${channelId}/message`,
          { content, channelId },
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
          //Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
  
      await axios
        .get(GET_ALL_MESSAGES_API+ '/' + `${channelId}`,
          { channelId }, 
          config)
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: MESSAGE_LIST_SUCCESS,
              payload: res.data.data,
              success: "Fetched messages successfully",
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
