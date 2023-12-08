import { useState } from "react";
// components
import Register from "./home-components/Register";
import Login from "./home-components/Login";
// icons and images
import wallpaper from "../assets/chat-wallpaper.jpg";

const Home = () => {
  const [login, setLogin] = useState(true);
  return (
    <div
      className="h-screen w-screen flex justify-center items-center "
      style={{ background: `url(${wallpaper})` }}
    >
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
};

export default Home;
