import Cookies from "js-cookie";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const cookieNames = Object.keys(Cookies.get());
    cookieNames.forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    window.location.href = "/login";
  }, []);
  return;
};

export default Logout;
