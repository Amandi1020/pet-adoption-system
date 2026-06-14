import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/CareGuide.css'

const guides = [
  {
    species: 'Dog',
    emoji: '🐶',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80',
    color: '#6D4C41',
    lightBg: '#EFEBE9',
    tagline: 'Loyal, energetic and full of unconditional love',
    intro: 'Dogs are one of the most rewarding pets you can have. They thrive on companionship, routine, and love. With the right care, a dog will be your most loyal friend for 10–15 years.',
    feeding: {
      title: 'Feeding',
      icon: '🍽️',
      content: 'Feed adult dogs twice a day — morning and evening. Use high-quality dry kibble mixed with wet food. Puppies need 3–4 meals daily. Always provide fresh clean water. Avoid chocolate, grapes, onions, and xylitol — these are toxic to dogs.',
      tip: 'Measure portions by weight to avoid overfeeding',
    },
    exercise: {
      title: 'Exercise',
      icon: '🏃',
      content: 'Dogs need at least 30–60 minutes of exercise daily depending on breed. High-energy breeds like Labradors need 90+ minutes. Daily walks, fetch, and off-leash play keep them physically and mentally healthy.',
      tip: 'Mental stimulation is as important as physical exercise',
    },
    grooming: {
      title: 'Grooming',
      icon: '✂️',
      content: 'Brush your dog 2–3 times per week. Bathe monthly unless they get muddy. Trim nails every 3–4 weeks — overgrown nails cause pain. Clean ears weekly and brush teeth 2–3 times per week.',
      tip: 'Start grooming routines early so your dog gets comfortable',
    },
    health: {
      title: 'Health',
      icon: '💉',
      content: 'Annual vet checkups are essential. Core vaccines: rabies, distemper, parvovirus, hepatitis. Use monthly flea and tick prevention. Heartworm prevention year-round. Spay or neuter at 6 months.',
      tip: 'Keep a vaccination record book for your dog',
    },
    tips: [
      { icon: '🏠', text: 'Create a dedicated sleeping space with a comfortable bed' },
      { icon: '🧩', text: 'Provide puzzle toys for mental stimulation' },
      { icon: '🐕', text: 'Socialise early with other dogs and people' },
      { icon: '🏷️', text: 'Always keep ID tags and update microchip details' },
      { icon: '🚗', text: 'Never leave your dog alone in a hot car' },
      { icon: '📅', text: 'Establish a consistent daily routine' },
    ],
    lifespan: '10–15 years',
    difficulty: 'Moderate',
    exercise_level: 'High',
    good_for: 'Active families, houses with gardens',
  },
  {
    species: 'Cat',
    emoji: '🐱',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&q=80',
    color: '#5D4037',
    lightBg: '#FFF3E0',
    tagline: 'Independent, curious and quietly affectionate',
    intro: 'Cats are wonderful companions for people who want a pet that is affectionate on its own terms. They are clean, relatively quiet, and can thrive in apartments as well as houses.',
    feeding: {
      title: 'Feeding',
      icon: '🍽️',
      content: 'Feed cats 2–3 small meals daily. Cats are obligate carnivores — they need real meat as the primary ingredient. Wet food supports hydration. Dry food helps dental health. Always provide fresh water — cats often prefer running water.',
      tip: 'A water fountain encourages cats to drink more',
    },
    exercise: {
      title: 'Exercise',
      icon: '🏃',
      content: 'Cats need indoor play sessions of 15–20 minutes twice daily. Use feather wands, laser pointers, and interactive toys. Climbing trees and window perches keep them active and stimulated. Rotate toys regularly.',
      tip: 'Play before feeding to mimic natural hunt-eat-sleep routine',
    },
    grooming: {
      title: 'Grooming',
      icon: '✂️',
      content: 'Short-haired cats need brushing once a week. Long-haired cats need daily brushing to prevent matting. Clean litter box every single day — cats will avoid dirty boxes. Trim nails every 2–3 weeks.',
      tip: 'Brush your cat on a schedule so they get used to it',
    },
    health: {
      title: 'Health',
      icon: '💉',
      content: 'Vaccinate against cat flu, feline enteritis, and leukaemia. Spay or neuter to prevent health issues and reduce roaming. Annual vet visits recommended. Watch for signs of urinary issues — a common problem in cats.',
      tip: 'Indoor cats live significantly longer than outdoor cats',
    },
    tips: [
      { icon: '🪴', text: 'Check that your houseplants are not toxic to cats' },
      { icon: '🪟', text: 'Provide window perches so they can watch the world' },
      { icon: '📦', text: 'Keep litter boxes clean — one per cat plus one extra' },
      { icon: '🛋️', text: 'Provide scratching posts to protect your furniture' },
      { icon: '🏠', text: 'Keep indoors for a longer, healthier life' },
      { icon: '💤', text: 'Cats sleep 12–16 hours — this is completely normal' },
    ],
    lifespan: '12–18 years',
    difficulty: 'Low',
    exercise_level: 'Moderate',
    good_for: 'Apartments, busy individuals, first-time pet owners',
  },
  {
    species: 'Bird',
    emoji: '🐦',
    img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=900&q=80',
    color: '#4E342E',
    lightBg: '#E8F5E9',
    tagline: 'Colourful, vocal and surprisingly intelligent',
    intro: 'Birds are far more social and intelligent than most people realise. They form strong bonds with their owners, can learn to talk, and bring incredible joy and energy to a home.',
    feeding: {
      title: 'Feeding',
      icon: '🍽️',
      content: 'Feed birds a mix of seeds, pellets, and fresh fruits/vegetables daily. Pellets should make up 60–70% of the diet. Fresh food like leafy greens, carrots, and apples are great. Never feed avocado, chocolate, onion, or caffeine — these are toxic.',
      tip: 'Introduce pellets gradually if your bird is used to seeds',
    },
    exercise: {
      title: 'Exercise',
      icon: '🏃',
      content: 'Allow birds 2–3 hours of supervised out-of-cage time daily. Provide swings, ladders, and foraging toys inside the cage. Wings should not be clipped — allow natural movement. Rotate toys weekly to prevent boredom.',
      tip: 'Out-of-cage time is essential for bird mental health',
    },
    grooming: {
      title: 'Grooming',
      icon: '✂️',
      content: 'Trim nails every 6–8 weeks — overgrown nails cause discomfort. Provide a shallow water dish or mist with water for bathing 2–3 times per week. Birds preen themselves but benefit from occasional gentle misting.',
      tip: 'Never use soap or shampoo on birds — plain water only',
    },
    health: {
      title: 'Health',
      icon: '💉',
      content: 'Find an avian vet — not all vets treat birds. Annual checkups are important. Birds hide illness well, so watch for: fluffed feathers, decreased activity, changes in droppings, or loss of appetite. These are early warning signs.',
      tip: 'Birds are prey animals and hide illness — watch closely',
    },
    tips: [
      { icon: '🍳', text: 'Never use non-stick cookware — toxic fumes are deadly' },
      { icon: '🌙', text: 'Birds need 10–12 hours of dark sleep every night' },
      { icon: '💬', text: 'Talk and sing to your bird daily for bonding' },
      { icon: '☀️', text: 'Keep cage away from drafts and direct strong sunlight' },
      { icon: '🧴', text: 'Avoid aerosols, candles, and air fresheners near birds' },
      { icon: '🔒', text: 'Bird-proof the room before allowing free flight' },
    ],
    lifespan: '15–50+ years (species dependent)',
    difficulty: 'Moderate',
    exercise_level: 'Moderate',
    good_for: 'Apartment living, patient owners, interactive households',
  },
  {
    species: 'Rabbit',
    emoji: '🐰',
    img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=900&q=80',
    color: '#795548',
    lightBg: '#F3E5F5',
    tagline: 'Gentle, social and full of quiet personality',
    intro: 'Rabbits are often underestimated as pets. They are highly social, intelligent, and can be litter-trained. With proper care and space, a rabbit can be a deeply rewarding companion.',
    feeding: {
      title: 'Feeding',
      icon: '🍽️',
      content: 'Unlimited hay should make up 80% of the diet — it is essential for digestion and dental health. Add fresh leafy greens daily. Limit pellets to a small amount. Avoid starchy vegetables, fruit, and sugary treats completely.',
      tip: 'Timothy hay is ideal for adult rabbits — always available',
    },
    exercise: {
      title: 'Exercise',
      icon: '🏃',
      content: 'Rabbits need at least 3–4 hours of free-roaming time daily. They should never be kept in a small cage without time out. Provide a safe, rabbit-proofed space to run, hop, and explore. They love tunnels and boxes.',
      tip: 'Rabbits are most active at dawn and dusk',
    },
    grooming: {
      title: 'Grooming',
      icon: '✂️',
      content: 'Brush short-haired rabbits weekly. Long-haired breeds need daily brushing. Trim nails every 4–6 weeks. Never bathe a rabbit — it causes extreme stress and can be fatal. Spot-clean if necessary with a damp cloth.',
      tip: 'Check for matting under the tail regularly',
    },
    health: {
      title: 'Health',
      icon: '💉',
      content: 'Vaccinate annually against myxomatosis and rabbit haemorrhagic disease. Spay or neuter is strongly recommended — it prevents cancer in females. Find a rabbit-savvy vet. Rabbits need annual checkups and dental checks.',
      tip: 'A rabbit that stops eating for 12+ hours needs a vet immediately',
    },
    tips: [
      { icon: '🐇', text: 'Consider adopting in pairs — rabbits are very social' },
      { icon: '🔌', text: 'Rabbit-proof your home — they chew cables and furniture' },
      { icon: '🤲', text: 'Never pick up by the ears — hold body securely' },
      { icon: '🌿', text: 'Check that all plants and herbs are rabbit-safe' },
      { icon: '🛁', text: 'Never bathe a rabbit — it is extremely dangerous' },
      { icon: '💊', text: 'Rabbits need GI-safe pain relief — ask your vet' },
    ],
    lifespan: '8–12 years',
    difficulty: 'Moderate',
    exercise_level: 'Moderate',
    good_for: 'Gentle households, children 8+, apartment living',
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
          <p>Everything you need to give your pet the best life possible</p>
        </div>
      </div>

      <div className="care-tabs-wrap">
        <div className="care-tabs">
          {guides.map(g => (
            <button
              key={g.species}
              className={`care-tab ${selected === g.species ? 'active' : ''}`}
              onClick={() => setSelected(g.species)}
              style={selected === g.species ? {background: g.color, borderColor: g.color, color: '#FFF8E7'} : {}}
            >
              <span>{g.emoji}</span>
              <span>{g.species}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="care-body">

        {/* BANNER */}
        <div className="care-banner">
          <div className="care-banner-img">
            <img src={guide.img} alt={guide.species} />
          </div>
          <div className="care-banner-text" style={{background: `linear-gradient(135deg, ${guide.color}, #3E2723)`}}>
            <span className="care-banner-emoji">{guide.emoji}</span>
            <h2>{guide.species} Care Guide</h2>
            <p className="care-banner-tagline">{guide.tagline}</p>
            <p className="care-banner-intro">{guide.intro}</p>
          </div>
        </div>

        {/* QUICK FACTS */}
        <div className="care-quick-facts" style={{borderColor: guide.color}}>
          <div className="care-fact">
            <span className="care-fact-icon">⏳</span>
            <p className="care-fact-label">Lifespan</p>
            <p className="care-fact-value">{guide.lifespan}</p>
          </div>
          <div className="care-fact">
            <span className="care-fact-icon">📊</span>
            <p className="care-fact-label">Care level</p>
            <p className="care-fact-value">{guide.difficulty}</p>
          </div>
          <div className="care-fact">
            <span className="care-fact-icon">🏃</span>
            <p className="care-fact-label">Exercise</p>
            <p className="care-fact-value">{guide.exercise_level}</p>
          </div>
          <div className="care-fact">
            <span className="care-fact-icon">🏠</span>
            <p className="care-fact-label">Best for</p>
            <p className="care-fact-value">{guide.good_for}</p>
          </div>
        </div>

        {/* CARE CARDS */}
        <div className="care-cards-grid">
          {[guide.feeding, guide.exercise, guide.grooming, guide.health].map((section, i) => (
            <div key={i} className="care-info-card">
              <div className="care-card-header" style={{background: guide.lightBg}}>
                <span>{section.icon}</span>
                <h3>{section.title}</h3>
              </div>
              <div className="care-card-body">
                <p>{section.content}</p>
                <div className="care-card-tip">
                  <span>💡</span>
                  <p>{section.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TIPS */}
        <div className="care-tips-section" style={{background: `linear-gradient(135deg, ${guide.color}, #3E2723)`}}>
          <h3>Essential tips for {guide.species.toLowerCase()} owners</h3>
          <div className="care-tips-grid">
            {guide.tips.map((tip, i) => (
              <div key={i} className="care-tip-item">
                <span className="care-tip-icon">{tip.icon}</span>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="care-cta">
          <div className="care-cta-text">
            <h3>Ready to adopt a {guide.species.toLowerCase()}?</h3>
            <p>Browse our available {guide.species.toLowerCase()}s and find your perfect companion today.</p>
          </div>
          <div className="care-cta-btns">
            <Link to="/pets" className="care-cta-btn-primary" style={{background: guide.color}}>
              Browse {guide.species.toLowerCase()}s →
            </Link>
            <Link to="/quiz" className="care-cta-btn-outline">
              Take match quiz
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CareGuide