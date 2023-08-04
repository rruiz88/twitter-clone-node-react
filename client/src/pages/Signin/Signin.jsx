import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signin", { username, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
      console.log(res.data);
    } catch (err) {
      dispatch(loginFailed);
      console.log(err);
    }
  };

  return (
    <div>
      <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg md:w-6/12 mx-auto gap-10">
        <h2 className="text-3xl font-bold text-center">Sign in</h2>
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="username"
          className="text-xl  py-2 rounded-full px-4"
        ></input>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="password"
          className="text-xl  py-2 rounded-full px-4"
        ></input>
        <button
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
          onClick={loginHandler}
        >
          Sign in
        </button>
        <p text-center text-xl>
          Create an account!
        </p>
        <input
          type="text"
          placeholder="username"
          className="text-xl  py-2 rounded-full px-4"
        ></input>
        <input
          type="email"
          placeholder="email"
          className="text-xl  py-2 rounded-full px-4"
        ></input>
        <input
          type="password"
          placeholder="password"
          className="text-xl  py-2 rounded-full px-4"
        ></input>
        <button
          className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
          type="submit"
        >
          Sign Up!
        </button>
      </form>
    </div>
  );
};

export default Signin;
