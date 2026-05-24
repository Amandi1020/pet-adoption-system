import { useState } from 'react'
import '../styles/FAQ.css'

const faqs = [
  {
    q: 'How do I adopt a pet from PawFind?',
    a: 'Browse our available pets, click on a pet you like, and submit an adoption application. Our team will review it within 2–3 working days and contact you with the result.'
  },
  {
    q: 'Is there a fee to adopt a pet?',
    a: 'There is a small adoption fee to cover vaccinations, microchipping, and vet checkups. The exact fee depends on the species and age of the pet.'
  },
  {
    q: 'What happens after I submit an application?',
    a: 'Your application goes to our admin team for review. You can track the status on your My Applications page. Status moves from Pending to Reviewing to Approved or Rejected.'
  },
  {
    q: 'Are all pets vaccinated?',
    a: 'Yes — all pets at PawFind have complete vaccination records and have been checked by a licensed veterinarian before being listed for adoption.'
  },
  {
    q: 'Can I adopt if I live in an apartment?',
    a: 'Yes! Many pets are suitable for apartment living. Use our Match Quiz to find the right pet for your living situation. Cats, small dogs, birds, and rabbits are great for apartments.'
  },
  {
    q: 'What is the Match Quiz?',
    a: 'The Match Quiz asks 7 questions about your lifestyle, home, and experience. Based on your answers, we suggest the species that best matches your situation.'
  },
  {
    q: 'Can I return a pet after adoption?',
    a: 'We understand sometimes situations change. Please contact us directly if you are unable to keep your pet — we will work with you to find the best solution for the animal.'
  },
  {
    q: 'How do I share a success story?',
    a: 'After adopting, visit our Stories page and click Share Your Story. Write about your experience and submit it. Our team will approve and publish it on the public feed.'
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about adopting through PawFind</p>
      </div>

      <div className="faq-body">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${open === i ? 'open' : ''}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="faq-question">
              <p>{faq.q}</p>
              <span className="faq-icon">{open === i ? '−' : '+'}</span>
            </div>
            {open === i && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ