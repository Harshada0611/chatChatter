import { useState } from "react";
// components
import Register from "./home-components/Register";
import Login from "./home-components/Login";

const Home = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('https://cutewallpaper.org/28/cm-wallpaper-download/1078216867.jpg')]">
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
};

export default Home;
