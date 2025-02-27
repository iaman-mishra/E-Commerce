import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { shopContext } from "../context/shopContext";
import { toast } from "react-toastify";

const Login = () => {
  const { token, SetToken, navigate, backendUrl } = useContext(shopContext);

  const [CurrentState, SetCurrentState] = useState("Login");
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (CurrentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        if (response.data.success) {
          SetToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password });
        if (response.data.success) {
          SetToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{CurrentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {CurrentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800 "
          placeholder="Name"
          required
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Email"
        required
        value={email}
        onChange={(e) => {
          SetEmail(e.target.value);
        }}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Password"
        required
        value={password}
        onChange={(e) => {
          SetPassword(e.target.value);
        }}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {CurrentState === "Login" ? (
          <p
            onClick={() => SetCurrentState("Sign Up")}
            className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p
            onClick={() => SetCurrentState("Login")}
            className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>
      <button
        onClick={(e) => {
          submitHandler(e);
        }}
        className="bg-black text-white font-light px-8 py-2 mt-4"
        type="submit">
        {CurrentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
