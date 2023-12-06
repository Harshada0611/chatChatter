import { useState } from "react";
import { registerUser } from "../api-calls/user";
// icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "react-hot-toast";

const Register = ({ setLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Creating User");
      const resp = await registerUser(formData);
      toast.dismiss();
      if (resp.success) {
        setLogin(true);
        return toast.success(resp.msg);
      }
      toast.error(resp.msg);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black/50 rounded-xl  w-[90%] lg:w-[45%] px-2 py-5 ">
      <h5 className="px-3 text-white">
        Existing User?
        <span
          onClick={() => setLogin(true)}
          className="px-2  underline underline-offset-2 cursor-pointer text-blue-400"
        >
          Login
        </span>
      </h5>
      <form onSubmit={handleSubmit} className="space-y-6 px-5 pb-3 mt-10 ">
        <section className="px-1.5 w-full flex bg-white/70 rounded-md">
          <span className="flex justify-center items-center">
            <FaUser />
          </span>
          <input
            placeholder="Username"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="focus:outline-none w-full px-2 py-2 rounded-l-md bg-transparent "
          />
        </section>

        <section className="px-1.5 w-full flex bg-white/70 rounded-md">
          <span className="flex justify-center items-center">
            <MdEmail />
          </span>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="focus:outline-none w-full px-2 py-2 rounded-l-md bg-transparent "
          />
        </section>

        <section className="px-1.5 w-full flex bg-white/70 rounded-md">
          <span
            onClick={togglePasswordVisibility}
            className="flex justify-center items-center"
          >
            {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <input
            placeholder="Set Password"
            type={formData.showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="focus:outline-none w-full px-2 py-2 rounded-l-md bg-transparent"
          />
        </section>
        <section>
          <button
            type="submit"
            disabled={!formData.email || !formData.password}
            className="bg-[#00ACC1] w-full py-1 rounded-lg font-bold italic cursor-pointer disabled:cursor-not-allowed "
          >
            Sign Up
          </button>
        </section>
      </form>
    </div>
  );
};

export default Register;
