import request from "../../server";
import Cookies from "js-cookie";
import { TOKEN } from "../../constant";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { controlAuthenticated } from "../../redux/slices/authSlice";
import { message } from "antd";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    try {
      let user = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      console.log(user);

      let { data } = await request.post("auth/login", user);

      if (data.user.role === "admin") {
        navigate("/dashboard");
        dispatch(controlAuthenticated(true));
        Cookies.set(TOKEN, data.token);
      } else {
        navigate("/user");
        dispatch(controlAuthenticated(true));
        Cookies.set(TOKEN, data.token);
      }
    } catch (err) {
      toast.error("Password or username is wrong !");
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
        <form className="form" onSubmit={login}>
          <label className="form-case">
            <i className="fa-solid fa-user"></i>|
            <input id="username" type="text" placeholder="User Name" />
          </label>
          <label className="form-case">
            <i className="fa-solid fa-lock"></i>|
            <input id="password" type="password" placeholder="Password" />
          </label>
          <Link className="jumping" to={"/register"}>
            Register?
          </Link>
          <center>
            <button className="btn-white">Login</button>
          </center>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
