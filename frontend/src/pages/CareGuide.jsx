import { useState } from 'react'
import '../styles/CareGuide.css'

const guides = [
  {
    species: 'Dog',
    emoji: '🐶',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    feeding: 'Feed adult dogs twice a day — morning and evening. Use high-quality dry kibble mixed with wet food. Always provide fresh water.',
    exercise: 'Dogs need at least 30–60 minutes of exercise daily. Daily walks, fetch, and playtime keep them healthy and happy.',
    grooming: 'Brush your dog 2–3 times per week. Bathe monthly. Trim nails every 3–4 weeks and clean ears weekly.',
    health: 'Annual vet checkups are essential. Keep vaccinations up to date — rabies, distemper, parvovirus. Use flea and tick prevention monthly.',
    tips: ['Never leave your dog alone for more than 8 hours', 'Socialise your dog early with people and other animals', 'Provide mental stimulation with puzzle toys', 'Always have ID tags on your dog'],
  },
  {
    species: 'Cat',
    emoji: '🐱',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
    feeding: 'Feed cats 2–3 small meals daily. Cats need high-protein food — look for real meat as the first ingredient. Always provide fresh water.',
    exercise: 'Cats need indoor play sessions of 15–20 minutes twice daily. Use feather wands, laser pointers, and climbing trees.',
    grooming: 'Short-haired cats need brushing weekly. Long-haired cats need daily brushing. Clean litter box daily.',
    health: 'Vaccinate against cat flu, feline enteritis, and leukaemia. Spay or neuter to prevent health issues. Annual vet visits recommended.',
    tips: ['Keep cats indoors for safety', 'Provide scratching posts to protect furniture', 'Cats are independent but still need daily interaction', 'Never declaw your cat'],
  },
  {
    species: 'Bird',
    emoji: '🐦',
    img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80',
    feeding: 'Feed birds a mix of seeds, pellets, and fresh fruits/vegetables daily. Avoid avocado, chocolate, and onion — these are toxic.',
    exercise: 'Allow birds 2–3 hours of supervised out-of-cage time daily. Provide swings, ladders, and foraging toys inside the cage.',
    grooming: 'Trim nails and wing feathers every 6–8 weeks. Provide a shallow water dish for bathing 2–3 times per week.',
    health: 'Find an avian vet for annual checkups. Watch for signs of illness — fluffed feathers, lethargy, or loss of appetite.',
    tips: ['Never use non-stick cookware near birds — toxic fumes', 'Birds need 10–12 hours of darkness for sleep', 'Talk and sing to your bird daily for bonding', 'Keep the cage away from drafts and direct sunlight'],
  },
  {
    species: 'Rabbit',
    emoji: '🐰',
    img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
    feeding: 'Unlimited hay should be the main diet. Add fresh leafy greens daily. Limit pellets to 1/4 cup per 2kg body weight. No sugary treats.',
    exercise: 'Rabbits need at least 3–4 hours of free-roaming exercise daily. Provide a safe, rabbit-proofed space.',
    grooming: 'Brush weekly for short-haired rabbits and daily for long-haired. Trim nails every 4–6 weeks. Never bathe a rabbit.',
    health: 'Vaccinate against myxomatosis and rabbit haemorrhagic disease. Spay or neuter recommended. Annual vet visits.',
    tips: ['Never pick up a rabbit by the ears', 'Rabbits are social — consider adopting in pairs', 'Rabbit-proof your home — they chew wires!', 'Handle gently and never drop — bones are fragile'],
  },
]

function CareGuide() {
  const [selected, setSelected] = useState('Dog')
  const guide = guides.find(g => g.species === selected)

  return (
    <div className="care-page">

      <div className="care-hero">
        <h1>Pet Care Guide 💚</h1>
        <p>Everything you need to know to keep your pet healthy and happy</p>
      </div>

      <div className="care-tabs">
        {guides.map(g => (
          <button
            key={g.species}
            className={`care-tab ${selected === g.species ? 'active' : ''}`}
            onClick={() => setSelected(g.species)}
          >
            {g.emoji} {g.species}
          </button>
        ))}
      </div>

      <div className="care-body">
        <div className="care-header">
          <img src={guide.img} alt={guide.species} className="care-img" />
          <div className="care-header-text">
            <h2>{guide.emoji} {guide.species} Care Guide</h2>
            <p>Complete guide to caring for your {guide.species.toLowerCase()} at home</p>
          </div>
        </div>

        <div className="care-grid">
          <div className="care-card">
            <h3>🍽️ Feeding</h3>
            <p>{guide.feeding}</p>
          </div>
          <div className="care-card">
            <h3>🏃 Exercise</h3>
            <p>{guide.exercise}</p>
          </div>
          <div className="care-card">
            <h3>✂️ Grooming</h3>
            <p>{guide.grooming}</p>
          </div>
          <div className="care-card">
            <h3>💉 Health</h3>
            <p>{guide.health}</p>
          </div>
        </div>

        <div className="care-tips">
          <h3>💡 Top tips for {guide.species.toLowerCase()} owners</h3>
          <ul>
            {guide.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default CareGuide