import axios from "axios";

export const GetAllChats = async (token) => {
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

export const CreateNewChat = async (members, token) => {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/create-new-chat`,
      members,
      { headers: { authorization: token } }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};
