import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

//the component for user to input their name
export default function UserForm() {

  //state to hold the inputted name
  const [inputName, setInputName] = useState('');
  //access the setName function from context
  const { setName } = useContext(UserContext);

  //handle form submission 
  function handleSubmit(e) {

    //prevent default form submission behavior
    e.preventDefault();

    setName(inputName);  // Set the name in context to make it globally accessible

    window.history.pushState({}, '', '/quiz');  // Change the URL to /quiz without reloading the page

    // Create a popstate event to notify the router of the URL change
    const navEvent = new PopStateEvent('popstate');

    //dispatch the event to trigger navigation
    window.dispatchEvent(navEvent);  

  }

  //the returned JSX for the form 
  return (

    //form to input name and start quiz with the handleSubmit function attached to onSubmit event
    <form onSubmit={handleSubmit}>

      {/* Input field for name */}
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}//update state on input change
        placeholder="Enter your name"
      />

      <br/><br/>

      {/* Button to submit the form */}
      <button type="submit">Start Quiz</button>
      
    </form>


  );
}