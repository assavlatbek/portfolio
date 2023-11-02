import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useGetUserQuery } from "../../redux/services/checkUserService";
import Cookies from "js-cookie";

const UserPage = () => {
  const id = Cookies.get("user_id");
  const { data, isFetching } = useGetUserQuery(id);
  if (data?.role === "client") {
    Cookies.set("ROLE", "client");
    setTimeout(() => {
      window.location.href = "/profile";
    }, 600);
  }
  const navigate = useNavigate();
  const logout = () => {
    navigate("/logout");
  };
  return (
    <div className="user-request">
      <div className="bg-opacity-effect">
        {isFetching ? (
          <>
            <img
              width={"100px"}
              src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
              alt=""
            />
          </>
        ) : (
          <center>
            {data?.role !== "client" ? (
              <>
                <h1>
                  <span className="text-primary">
                    Welcome{" "}
                    <b className="text-warning username">{data.username}</b>
                  </span>
                  ,{" "}
                  <TypeAnimation
                    sequence={[
                      "request sent",
                      1200,
                      "just wait for be a client",
                      1200,
                    ]}
                    wrapper="span"
                    cursor={false}
                    speed={50}
                    repeat={Infinity}
                  />{" "}
                  <b className="text-success">successfully</b> !
                </h1>
                <h3>
                  You registered as <b className="text-primary">User</b>, wait
                  for admin's confrim you{" "}
                  <img
                    width={"25px"}
                    src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
                    alt=""
                  />
                </h3>
                <br />
                <br />
                <button className="user-button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <center>
                  <h1>
                    You're a <b className="text-success">Client</b>
                  </h1>
                  <h3>
                    Wait You are redricting{" "}
                    <img
                      width={"25px"}
                      src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
                      alt=""
                    />
                  </h3>
                </center>
              </>
            )}
          </center>
        )}
      </div>
    </div>
  );
};

export default UserPage;
