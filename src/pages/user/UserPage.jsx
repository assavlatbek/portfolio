import React from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/logout");
  };
  return (
    <div>
      <br />
      <br />
      <center>
        <h1>Welcome, We are working on it, please wait for new updates :)</h1>
        <button onClick={logout}>Logout</button>
      </center>
    </div>
  );
};

export default UserPage;
