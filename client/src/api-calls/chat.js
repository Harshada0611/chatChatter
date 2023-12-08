import axios from "axios";

//fetch all active chat of selected chat
export const get_all_chats = async (token) => {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/fetch-active-chats`,
      { headers: { authorization: token } }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};

//create new chat
export const create_new_chat = async (members, token) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/create-new-chat`,
      { members },
      { headers: { authorization: token } }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};

//clear unread message update unread message count:0 & read state of message as true
export const clear_unread_messages = async (chatId) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/clear-unread-messages/${chatId}`
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};
