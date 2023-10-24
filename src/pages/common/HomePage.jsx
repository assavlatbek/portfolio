import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [text, setText] = useState("");
  const fullText = "Create Your Own Resume and Portfolio :)";
  const typingSpeed = 50; // Speed in milliseconds per character
  const backDeleteSpeed = 25; // Speed for back-deleting
  const initialDelay = 1000; // Delay before typing starts
  const pauseBetweenAnimation = 1000; // Delay between animations

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

      typeText(); // Loop for continuous animation
    };

    // Delay before typing starts
    setTimeout(typeText, initialDelay);
  }, []);

  return (
    <section className="hero-section">
      <div className="bg-opacity">
        <div className="container">
          <h1>
            <span className="sayHI">Hi </span>,
            <span className="sayHI"> {text}</span>
          </h1>
          <p>
            You can create your own resume and portfolio using this website, so
            login and try
          </p>
          <br />
          <Link to={"/login"} className="hero-button">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
