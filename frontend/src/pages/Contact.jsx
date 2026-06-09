import { useState, useRef } from 'react'
import '../styles/Contact.css'

function Contact() {
  const form = useRef()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setStatus('success')
      setLoading(false)
      form.current.reset()
    }, 1500)
  }

  return (
    <div className="contact-page">

      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in touch 🐾</h1>
          <p>Have a question about adoption? We would love to hear from you.</p>
        </div>
      </div>

      <div className="contact-body">

        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">📧</div>
            <h3>Email us</h3>
            <p>info@pawfind.com</p>
            <span className="contact-info-tag">Reply within 24 hours</span>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">📞</div>
            <h3>Call us</h3>
            <p>+94 11 234 5678</p>
            <span className="contact-info-tag">Mon–Sat 9am–5pm</span>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">📍</div>
            <h3>Visit us</h3>
            <p>123 Shelter Road</p>
            <span className="contact-info-tag">Colombo 03, Sri Lanka</span>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">⏰</div>
            <h3>Working hours</h3>
            <p>Mon–Fri: 9am–6pm</p>
            <span className="contact-info-tag">Sat–Sun: 10am–4pm</span>
          </div>
        </div>

        <div className="contact-main-grid">

          <div className="contact-form-card">
            <h2>Send us a message</h2>
            <p className="contact-form-sub">Fill in the form below and we will get back to you shortly</p>

            {status === 'success' && (
              <div className="contact-success">
                ✅ Message sent! We will get back to you within 24 hours.
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Full Name</label>
                  <input type="text" name="user_name" placeholder="Your full name" required />
                </div>
                <div className="contact-form-group">
                  <label>Email Address</label>
                  <input type="email" name="user_email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="contact-form-group">
                <label>Phone Number (optional)</label>
                <input type="tel" name="user_phone" placeholder="+94 XX XXX XXXX" />
              </div>
              <div className="contact-form-group">
                <label>Subject</label>
                <select name="subject" required>
                  <option value="">Select a topic</option>
                  <option value="adoption">Adoption enquiry</option>
                  <option value="application">Application status</option>
                  <option value="care">Pet care question</option>
                  <option value="donation">Donation</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="contact-form-group">
                <label>Message</label>
                <textarea name="message" placeholder="Tell us how we can help you..." required rows="5" />
              </div>
              <button type="submit" className="contact-submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message 📨'}
              </button>
            </form>
          </div>

          <div className="contact-side">
            <div className="contact-map-card">
              <div className="map-inner">
                <p className="map-emoji">📍</p>
                <h3>PawFind Shelter</h3>
                <p>123 Shelter Road</p>
                <p>Colombo 03, Sri Lanka</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="map-btn">
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
            <div className="contact-faq-card">
              <h3>Quick answers</h3>
              <div className="contact-faq-list">
                <div className="contact-faq-item">
                  <p className="contact-faq-q">How long does adoption take?</p>
                  <p className="contact-faq-a">Usually 3–5 working days after application.</p>
                </div>
                <div className="contact-faq-item">
                  <p className="contact-faq-q">Are all pets vaccinated?</p>
                  <p className="contact-faq-a">Yes — all pets have complete vaccination records.</p>
                </div>
                <div className="contact-faq-item">
                  <p className="contact-faq-q">Can I visit before adopting?</p>
                  <p className="contact-faq-a">Absolutely! Visit us during working hours.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact