import React, { useState } from "react";

const Login = () => {
  const [CurrentState, SetCurrentState] = useState("Sign Up");

  const submitHandler=(event)=>{
    event.preventDefault();
  }

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
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
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {CurrentState === "Login" ? (
          <p onClick={()=>SetCurrentState('Sign Up')} className="cursor-pointer">Create account</p>
        ) : (
          <p onClick={()=>SetCurrentState('Login')} className="cursor-pointer">Login Here</p>
        )}
      </div> 
      <button onClick={(e)=>{submitHandler(e)}} className="bg-black text-white font-light px-8 py-2 mt-4" type="submit">{CurrentState==='Login' ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default Login;
