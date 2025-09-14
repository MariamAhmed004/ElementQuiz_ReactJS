import React from "react";
import {Routes, Route , Link} from 'react-router-dom';

const Header = () => {

  //the returned JSX for the header
  return (

    //the header with title, subtitle and navigation links
    <header>
      <h1>Which Element Are You?</h1>
        <p>Based on Random things!</p>

      {/* Navigation links to Home and Quiz pages , uses the routes in the  app.jsx */}
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/quiz">Quiz</Link>
      </nav>

    </header>

  );
};

export default Header;
