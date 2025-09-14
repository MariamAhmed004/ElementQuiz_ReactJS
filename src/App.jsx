import { useState, useEffect } from 'react'
import './App.css'

//importing components
import Question from './components/Question'
import Results from './components/Results'
import UserForm from './components/UserForm'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'

function App() {
  //adding states for current question, answers, element and artwork
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  //questions array 
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Choose a pet:",
      options: ["Dog 🐶", "Cat 🐱", "Bird 🐦", "Fish 🐟"],
    },
    {
      question: "Pick a season:",
      options: ["Spring 🌸", "Summer ☀️", "Autumn 🍂", "Winter ❄️"],
    },
    {
      question: "Select a hobby:",
      options: ["Reading 📚", "Traveling ✈️", "Gaming 🎮", "Cooking 🍳"],
    },
    {
      question: "What's your favorite type of music?",
      options: ["Pop 🎤", "Rock 🎸", "Classical 🎻", "Jazz 🎷"],
    },
    {
      question: "Choose a dessert:",
      options: ["Ice Cream 🍦", "Cake 🎂", "Cookies 🍪", "Fruit 🍓"],
    },
  ];

  //const of keywords of categories
  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  //map each option to a category
  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Dog 🐶": "Earth",
    "Cat 🐱": "Earth",
    "Bird 🐦": "Air",
    "Fish 🐟": "Water",
    "Spring 🌸": "Earth",
    "Summer ☀️": "Fire",
    "Autumn 🍂": "Air",
    "Winter ❄️": "Water",
    "Reading 📚": "Earth",
    "Traveling ✈️": "Air",
    "Gaming 🎮": "Fire",
    "Cooking 🍳": "Water",
    "Pop 🎤": "Air",
    "Rock 🎸": "Earth",
    "Classical 🎻": "Water",
    "Jazz 🎷": "Fire",
    "Ice Cream 🍦": "Water",
    "Cake 🎂": "Earth",
    "Cookies 🍪": "Air",
    "Fruit 🍓": "Fire",
  };

  //handler for answering and submitting the quiz and determining the element
  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function handleUserFormSubmit() {
    // No need to set name here; UserForm handles it via context
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  //fetch artwork from the MET Museum API based on the determined element
  async function fetchArtwork(elementKeyword) {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${elementKeyword}`);
    const data = await response.json();
    if (data.total > 0) {
      const objectID = data.objectIDs[0];
      const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const objectData = await objectResponse.json();
      setArtwork(objectData); // <-- Set the whole object
    } else {
      setArtwork(null);
    }
  }

  //using useEffect for performing side effects in function components
  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [answers, currentQuestionIndex]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
