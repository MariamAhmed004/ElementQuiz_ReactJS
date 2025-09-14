import React from "react";

// The Question component: renders a question with multiple choice options
export default function Question({ question, options, onAnswer }) {

  //the returned JSX for the question and options
  return (

    <div>

        {/* Display the question and map over options to create buttons for each answer */}
      <h2>{question}</h2>

      {/* Map over options array to create buttons for each answer */}
      {options.map(function (option) {
        return (
          <button
            key={option}
            onClick={function () {
              onAnswer(option);
            }}
          >
            {option}
          </button>
        );
      })}


    </div>

  );
}