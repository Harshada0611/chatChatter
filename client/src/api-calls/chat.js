import axios from "axios";

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
