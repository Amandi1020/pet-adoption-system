import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Quiz.css'

const questions = [
  {
    id: 1,
    question: 'Where do you live?',
    options: [
      { label: 'Apartment', value: 'apartment' },
      { label: 'House with garden', value: 'house' },
      { label: 'Villa', value: 'villa' },
    ],
  },
  {
    id: 2,
    question: 'How active is your lifestyle?',
    options: [
      { label: 'Very active — I love outdoor activities', value: 'active' },
      { label: 'Moderate — I go out sometimes', value: 'moderate' },
      { label: 'Relaxed — I prefer staying home', value: 'relaxed' },
    ],
  },
  {
    id: 3,
    question: 'How many hours are you home per day?',
    options: [
      { label: 'Less than 4 hours', value: 'low' },
      { label: '4 to 8 hours', value: 'medium' },
      { label: 'More than 8 hours', value: 'high' },
    ],
  },
  {
    id: 4,
    question: 'Do you have children at home?',
    options: [
      { label: 'Yes — young children', value: 'young_kids' },
      { label: 'Yes — older children', value: 'older_kids' },
      { label: 'No children', value: 'no_kids' },
    ],
  },
  {
    id: 5,
    question: 'Have you owned a pet before?',
    options: [
      { label: 'Yes — many times', value: 'experienced' },
      { label: 'Yes — once or twice', value: 'some_experience' },
      { label: 'Never — first time', value: 'no_experience' },
    ],
  },
  {
    id: 6,
    question: 'How much time can you spend with your pet daily?',
    options: [
      { label: 'A lot — I love playing and bonding', value: 'high' },
      { label: 'Moderate — some play time', value: 'medium' },
      { label: 'Low — I need an independent pet', value: 'low' },
    ],
  },
  {
    id: 7,
    question: 'What do you prefer in a pet?',
    options: [
      { label: 'Energetic and playful', value: 'energetic' },
      { label: 'Calm and cuddly', value: 'calm' },
      { label: 'Independent and quiet', value: 'independent' },
    ],
  },
]

const getResult = (answers) => {
  const active = answers.filter(a =>
    ['house', 'villa', 'active', 'high', 'experienced', 'energetic'].includes(a)
  ).length

  const calm = answers.filter(a =>
    ['apartment', 'relaxed', 'calm', 'high', 'no_kids'].includes(a)
  ).length

  const independent = answers.filter(a =>
    ['apartment', 'low', 'independent', 'no_experience'].includes(a)
  ).length

  if (active >= 4) return {
    pet: 'Dog 🐶',
    desc: 'You are active, social and love outdoor time. A dog is your perfect companion — loyal, energetic and always happy to see you!',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    species: 'Dog',
  }
  if (calm >= 3) return {
    pet: 'Cat 🐱',
    desc: 'You prefer a calm, cozy home life. A cat is ideal — independent enough to give you space but loving when you need company.',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
    species: 'Cat',
  }
  if (independent >= 3) return {
    pet: 'Bird 🐦',
    desc: 'You want a pet that brings joy without too much demand. A bird is perfect — colourful, entertaining and relatively easy to care for.',
    img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80',
    species: 'Bird',
  }
  return {
    pet: 'Rabbit 🐰',
    desc: 'You are gentle, calm and love soft companionship. A rabbit is a wonderful match — quiet, affectionate and perfect for any home.',
    img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
    species: 'Rabbit',
  }
}

function Quiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value]
    if (current + 1 < questions.length) {
      setAnswers(newAnswers)
      setCurrent(current + 1)
    } else {
      setResult(getResult(newAnswers))
    }
  }

  const restart = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  if (result) {
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <div className="result-img-wrap">
            <img src={result.img} alt={result.pet} />
          </div>
          <div className="result-body">
            <p className="result-label">Your perfect match is</p>
            <h2 className="result-pet">{result.pet}</h2>
            <p className="result-desc">{result.desc}</p>
            <div className="result-btns">
              <Link to="/pets" className="quiz-primary-btn">
                Find a {result.species} to adopt
              </Link>
              <button className="quiz-outline-btn" onClick={restart}>
                Retake quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-top">
          <p className="quiz-label">Find your perfect pet</p>
          <p className="quiz-count">Question {current + 1} of {questions.length}</p>
        </div>
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{width: `${progress}%`}}></div>
        </div>
        <h2 className="quiz-question">{q.question}</h2>
        <div className="quiz-options">
          {q.options.map(opt => (
            <button
              key={opt.value}
              className="quiz-option"
              onClick={() => handleAnswer(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {current > 0 && (
          <button className="quiz-back" onClick={() => {
            setCurrent(current - 1)
            setAnswers(answers.slice(0, -1))
          }}>
            ← Back
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz