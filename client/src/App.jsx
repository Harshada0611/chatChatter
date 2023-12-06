import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// pages
import Home from "./pages/Home";
import ChatContainer from "./pages/ChatContainer";

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatContainer />} />
      </Routes>
    </div>
  );
}

export default App;
