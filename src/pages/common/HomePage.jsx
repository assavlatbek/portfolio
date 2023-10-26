import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideLoader = () => {
      setIsVisible(false);
    };

    setTimeout(hideLoader, 3000);
  }, []);

  return (
    <>
      <div className={`loader ${isVisible ? "visible" : "hidden"}`}>
        <div>
          <img
            src="https://media.tenor.com/q4L3wKD-P7YAAAAj/hydra-we-bhack.gif"
            alt="hacker-loader"
          />
          <br />
          <br />
          <center>
            <h1>Wait ...</h1>
          </center>
        </div>
      </div>
      <section className="hero-section">
        <div className="bg-opacity">
          <div className="container">
            <h1>
              <span className="sayHI">Hi </span>,
              <span className="sayHI">
                {" "}
                <TypeAnimation
                  sequence={[
                    "Do You want to Create Your Portfolio and Resume?",
                    1300,
                    "Just Register and try, it is so fun!",
                    1300,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h1>
            <p>
              You can create your own resume and portfolio using this website,
              so login and try, are you ready to get Start?
            </p>
            <br />
            <Link to={"/login"} className="hero-button">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
