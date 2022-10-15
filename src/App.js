import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Footer from "./components/Footer";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";

function App() {
  const filters = useSelector((state) => state.filters);
  const { status } = filters;
  return (
    <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
      <Navbar />
      <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-16">
        <Header />

        <hr className="mt-4" />

        {status !== "Complete" && <TodoList statusTodo={false} />}

        <hr className="mt-4" />

        {status !== "Incomplete" && <TodoList statusTodo={true} />}

        <Footer />

        <hr className="mt-4" />

        {/* <TodoList status="Complete" /> */}
      </div>
    </div>
  );
}

export default App;
