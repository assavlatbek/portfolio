import React, { useState } from "react";
import request from "../server";
import Cookies from "js-cookie";
import { TOKEN } from "../constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const submit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        username: e.target.username.value,
        password: e.target.password.value,
      };

      const { data } = await request.post("auth/register", user);
      Cookies.set(TOKEN, data.token);
      e.target.firstName.value = "";
      e.target.lastName.value = "";
      e.target.username.value = "";
      e.target.password.value = "";
      toast.success("You registered succussfully");
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
  return (
    <section className="register">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="container form-container">
        <h1 className="form-title">
          Register <i class="fa-solid fa-unlock"></i>
        </h1>
        <form className="form" onSubmit={submit}>
          <label htmlFor="firstName" className="form-case">
            <i className="fa-regular fa-user"></i>|
            <input id="firstName" type="text" placeholder="First Name" />
          </label>
          <label className="form-case">
            <i className="fa-solid fa-user-tie"></i>|
            <input id="lastName" type="text" placeholder="Last Name" />
          </label>
          <label className="form-case">
            <i className="fa-solid fa-user"></i>|
            <input id="username" type="text" placeholder="User Name" />
          </label>
          <label className="form-case">
            <i className="fa-solid fa-lock"></i>|
            <input id="password" type="password" placeholder="Password" />
          </label>
          <Link to={"/login"}>Login?</Link>
          <center>
            <button className="btn-white">Register</button>
          </center>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
