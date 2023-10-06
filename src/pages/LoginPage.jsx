import request from "../server";
import Cookies from "js-cookie";
import { TOKEN } from "../constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const submit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      const { data } = await request.post("auth/login", user);
      Cookies.set(TOKEN, data.token);
      e.target.username.value = "";
      e.target.password.value = "";
      toast.success("You logined succussfully");
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
          Login <i class="fa-solid fa-lock"></i>
        </h1>
        <form className="form" onSubmit={submit}>
          <label className="form-case">
            <i className="fa-solid fa-user"></i>|
            <input id="username" type="text" placeholder="User Name" />
          </label>
          <label className="form-case">
            <i className="fa-solid fa-lock"></i>|
            <input id="password" type="password" placeholder="Password" />
          </label>
          <Link to={"/register"}>Register?</Link>
          <center>
            <button className="btn-white">Login</button>
          </center>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
