import React, { useState, useEffect } from 'react'
import { Header, UserProvider, UserForm, UserContext, Results, Question } from './components'
import { Routes, Route } from 'react-router-dom'

const App = () => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState('')
  const [element, setElement] = useState('')
  const [artwork, setArtwork] = useState(null)

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your ideal vacation?",
      options: ["Volcano hiking 🌋", "Beach relaxation 🏖️", "Mountain climbing ⛰️", "Sky diving ✈️"],
    },
    {
      question: "How do you prefer to spend your free time?",
      options: ["Bonfire with friends 🔥", "Swimming pool 💧", "Gardening 🌿", "Kite flying 🪁"],
    },
  ]

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  }

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Volcano hiking 🌋": "Fire",
    "Beach relaxation 🏖️": "Water",
    "Mountain climbing ⛰️": "Earth",
    "Sky diving ✈️": "Air",
    "Bonfire with friends 🔥": "Fire",
    "Swimming pool 💧": "Water",
    "Gardening 🌿": "Earth",
    "Kite flying 🪁": "Air",
  }

  function handleAnswer(answer) {
    setAnswers([...answers, answer])
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  function handleUserFormSubmit(name) {
    setUserName(name)
  }

  function determineElement(answers) {
    const counts = {}
    answers.forEach(function (answer) {
      const element = elements[answer]
      counts[element] = (counts[element] || 0) + 1
    })
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b
    })
  }

  async function fetchArtwork(keyword) {
    try {
      const searchResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true`
      )
      const searchData = await searchResponse.json()

      if (searchData.objectIDs && searchData.objectIDs.length > 0) {
        for (let i = 0; i < Math.min(10, searchData.objectIDs.length); i++) {
          const objectId = searchData.objectIDs[i]
          const objectResponse = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
          )
          const objectData = await objectResponse.json()

          if (objectData.primaryImage) {
            setArtwork({
              title: objectData.title || 'Untitled',
              primaryImage: objectData.primaryImage,
              artistDisplayName: objectData.artistDisplayName || 'Unknown Artist',
              objectDate: objectData.objectDate || 'Unknown Date'
            })
            return
          } else if (objectData.primaryImageSmall) {
            setArtwork({
              title: objectData.title || 'Untitled',
              primaryImage: objectData.primaryImageSmall,
              artistDisplayName: objectData.artistDisplayName || 'Unknown Artist',
              objectDate: objectData.objectDate || 'Unknown Date'
            })
            return
          }
        }
      }
    } catch (error) {
      console.error('Error fetching artwork:', error)
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex, answers, questions.length]
  )

  return (
    <div className='min-h-screen p-4 flex flex-col items-center justify-center'>
      <Header />
      <UserProvider value={{ name: userName, setName: setUserName }}>
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App