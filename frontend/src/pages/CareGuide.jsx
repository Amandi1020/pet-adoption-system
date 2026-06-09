import { useState } from 'react'
import '../styles/CareGuide.css'

const guides = [
  {
    species: 'Dog',
    emoji: '🐶',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    color: '#6D4C41',
    bg: '#EFEBE9',
    tagline: 'Loyal, energetic and full of love',
    feeding: 'Feed adult dogs twice a day — morning and evening. Use high-quality dry kibble mixed with wet food. Always provide fresh clean water throughout the day.',
    exercise: 'Dogs need at least 30–60 minutes of exercise daily. Daily walks, fetch games, and playtime keep them physically and mentally healthy.',
    grooming: 'Brush your dog 2–3 times per week. Bathe monthly. Trim nails every 3–4 weeks and clean ears weekly to prevent infections.',
    health: 'Annual vet checkups are essential. Keep vaccinations up to date — rabies, distemper, parvovirus. Use flea and tick prevention monthly.',
    tips: ['Never leave your dog alone for more than 8 hours', 'Socialise your dog early with people and other animals', 'Provide mental stimulation with puzzle toys', 'Always have ID tags on your dog'],
  },
  {
    species: 'Cat',
    emoji: '🐱',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    color: '#5D4037',
    bg: '#FFF3E0',
    tagline: 'Independent, curious and affectionate',
    feeding: 'Feed cats 2–3 small meals daily. Cats need high-protein food — look for real meat as the first ingredient. Always provide fresh water.',
    exercise: 'Cats need indoor play sessions of 15–20 minutes twice daily. Use feather wands, laser pointers, and climbing trees to keep them active.',
    grooming: 'Short-haired cats need brushing weekly. Long-haired cats need daily brushing. Clean litter box every day without fail.',
    health: 'Vaccinate against cat flu, feline enteritis, and leukaemia. Spay or neuter to prevent health issues. Annual vet visits recommended.',
    tips: ['Keep cats indoors for safety', 'Provide scratching posts to protect furniture', 'Cats still need daily interaction despite being independent', 'Never declaw your cat — it is painful and unnecessary'],
  },
  {
    species: 'Bird',
    emoji: '🐦',
    img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80',
    color: '#4E342E',
    bg: '#E8F5E9',
    tagline: 'Colourful, vocal and intelligent',
    feeding: 'Feed birds a mix of seeds, pellets, and fresh fruits/vegetables daily. Never feed avocado, chocolate, or onion — these are toxic to birds.',
    exercise: 'Allow birds 2–3 hours of supervised out-of-cage time daily. Provide swings, ladders, and foraging toys inside the cage.',
    grooming: 'Trim nails and wing feathers every 6–8 weeks. Provide a shallow water dish for bathing 2–3 times per week.',
    health: 'Find an avian vet for annual checkups. Watch for signs of illness — fluffed feathers, lethargy, or loss of appetite.',
    tips: ['Never use non-stick cookware near birds — toxic fumes', 'Birds need 10–12 hours of darkness for sleep', 'Talk and sing to your bird daily for bonding', 'Keep cage away from drafts and direct sunlight'],
  },
  {
    species: 'Rabbit',
    emoji: '🐰',
    img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80',
    color: '#795548',
    bg: '#F3E5F5',
    tagline: 'Gentle, soft and surprisingly social',
    feeding: 'Unlimited hay should be the main diet. Add fresh leafy greens daily. Limit pellets to 1/4 cup per 2kg body weight. Avoid sugary treats completely.',
    exercise: 'Rabbits need at least 3–4 hours of free-roaming exercise daily. Provide a safe, rabbit-proofed space for them to explore.',
    grooming: 'Brush weekly for short-haired rabbits and daily for long-haired. Trim nails every 4–6 weeks. Never bathe a rabbit — it causes extreme stress.',
    health: 'Vaccinate against myxomatosis and rabbit haemorrhagic disease. Spay or neuter is recommended. Annual vet visits essential.',
    tips: ['Never pick up a rabbit by the ears', 'Rabbits are social — consider adopting in pairs', 'Rabbit-proof your home — they love chewing wires!', 'Handle gently and never drop — their bones are fragile'],
  },
]

function CareGuide() {
  const [selected, setSelected] = useState('Dog')
  const guide = guides.find(g => g.species === selected)

  return (
    <div className="care-page">

      <div className="care-hero" style={{background: `linear-gradient(135deg, ${guide.color} 0%, #3E2723 100%)`}}>
        <div className="care-hero-content">
          <span className="care-hero-emoji">{guide.emoji}</span>
          <h1>Pet Care Guide</h1>
          <p>Everything you need to know to keep your pet healthy and happy</p>
        </div>
      </div>

      <div className="care-tabs-wrap">
        <div className="care-tabs">
          {guides.map(g => (
            <button
              key={g.species}
              className={`care-tab ${selected === g.species ? 'active' : ''}`}
              onClick={() => setSelected(g.species)}
              style={selected === g.species ? {background: g.color, borderColor: g.color} : {}}
            >
              <span>{g.emoji}</span>
              <span>{g.species}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="care-body">

        <div className="care-banner">
          <div className="care-banner-img">
            <img src={guide.img} alt={guide.species} />
          </div>
          <div className="care-banner-text" style={{background: guide.color}}>
            <span className="care-banner-emoji">{guide.emoji}</span>
            <h2>{guide.species} Care Guide</h2>
            <p>{guide.tagline}</p>
          </div>
        </div>

        <div className="care-cards-grid">
          <div className="care-info-card">
            <div className="care-card-header" style={{background: guide.bg}}>
              <span>🍽️</span>
              <h3>Feeding</h3>
            </div>
            <div className="care-card-body">
              <p>{guide.feeding}</p>
            </div>
          </div>
          <div className="care-info-card">
            <div className="care-card-header" style={{background: guide.bg}}>
              <span>🏃</span>
              <h3>Exercise</h3>
            </div>
            <div className="care-card-body">
              <p>{guide.exercise}</p>
            </div>
          </div>
          <div className="care-info-card">
            <div className="care-card-header" style={{background: guide.bg}}>
              <span>✂️</span>
              <h3>Grooming</h3>
            </div>
            <div className="care-card-body">
              <p>{guide.grooming}</p>
            </div>
          </div>
          <div className="care-info-card">
            <div className="care-card-header" style={{background: guide.bg}}>
              <span>💉</span>
              <h3>Health</h3>
            </div>
            <div className="care-card-body">
              <p>{guide.health}</p>
            </div>
          </div>
        </div>

        <div className="care-tips-section" style={{background: guide.color}}>
          <h3>💡 Top tips for {guide.species.toLowerCase()} owners</h3>
          <div className="care-tips-grid">
            {guide.tips.map((tip, i) => (
              <div key={i} className="care-tip-item">
                <span className="care-tip-num">{i + 1}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default CareGuide