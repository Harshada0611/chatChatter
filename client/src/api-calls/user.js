import axios from "axios";

// user register
export const registerUser = async (data) => {
  console.log(data);
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-register`,
      data
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};

// user login
export const loginUser = async (data) => {
  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-login`,
      data
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};

// fetch login user details
export const fetchUserDetails = async (token) => {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user-details`,
      { headers: { authorization: token } }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};

// search user
export const searchUser = async (searchKey, token) => {
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/search-user?search_user=${searchKey}`,
      {
        headers: { authorization: token },
      }
    );
    return resp.data;
  } catch (err) {
    return err;
  }
};
