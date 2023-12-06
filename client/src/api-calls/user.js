import axios from "axios";

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
