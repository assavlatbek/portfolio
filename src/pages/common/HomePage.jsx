import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState("");
  const fullText = "Create Your Own Resume and Portfolio :)";
  const typingSpeed = 50;
  const backDeleteSpeed = 25;
  const initialDelay = 1000;
  const pauseBetweenAnimation = 1000;

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i <= fullText.length; i++) {
        setText(fullText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      }

      await new Promise((resolve) =>
        setTimeout(resolve, pauseBetweenAnimation)
      );

      for (let i = fullText.length; i >= 0; i--) {
        setText(fullText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, backDeleteSpeed));
      }

      await new Promise((resolve) =>
        setTimeout(resolve, pauseBetweenAnimation)
      );

      typeText();
    };

    setTimeout(typeText, initialDelay);

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
              <span className="sayHI"> {text}</span>
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
