import axios from "axios";

// send new message
export const send_new_message = async (message, token) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/send-new-message`,
      message,
      { headers: { authorization: token } }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};

// fetch all message of selected chat
export const fetch_messages = async (chatId, token) => {
  try {
    const resp = await axios(
      `${import.meta.env.VITE_BASE_URL}/fetch-chat-message/${chatId}`,
      { headers: { authorization: token } }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};
