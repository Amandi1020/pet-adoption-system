import { useState, useRef } from 'react'
import '../styles/Contact.css'

function Contact() {
  const form = useRef()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    user_name: '', user_email: '', user_phone: '', subject: '', message: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate sending — replace with EmailJS when ready
    setTimeout(() => {
      setStatus('success')
      setLoading(false)
      setFormData({ user_name: '', user_email: '', user_phone: '', subject: '', message: '' })
    }, 1500)

    // To enable real email sending uncomment below and add your EmailJS keys:
    // import emailjs from '@emailjs/browser'
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    //   .then(() => { setStatus('success'); setLoading(false) })
    //   .catch(() => { setStatus('error'); setLoading(false) })
  }

  return (
    <div className="contact-page">

     <div className="contact-hero">
        <div className="contact-hero-bg"></div>
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80"
          alt="Happy dog"
          className="contact-hero-animal"
        />
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1>Get in touch 🐾</h1>
          <p>Have a question about adoption? We would love to hear from you.</p>
        </div>
      </div>

      <div className="contact-info-strip">
        <div className="contact-info-item">
          <span className="contact-info-icon-wrap">📧</span>
          <div>
            <p className="contact-info-label">Email us</p>
            <a href="mailto:info@pawfind.com" className="contact-info-value">info@pawfind.com</a>
          </div>
        </div>
        <div className="contact-info-divider"></div>
        <div className="contact-info-item">
          <span className="contact-info-icon-wrap">📞</span>
          <div>
            <p className="contact-info-label">Call us</p>
            <a href="tel:+94112345678" className="contact-info-value">+94 11 234 5678</a>
          </div>
        </div>
        <div className="contact-info-divider"></div>
        <div className="contact-info-item">
          <span className="contact-info-icon-wrap">📍</span>
          <div>
            <p className="contact-info-label">Visit us</p>
            <p className="contact-info-value">123 Shelter Road, Colombo 03</p>
          </div>
        </div>
        <div className="contact-info-divider"></div>
        <div className="contact-info-item">
          <span className="contact-info-icon-wrap">⏰</span>
          <div>
            <p className="contact-info-label">Working hours</p>
            <p className="contact-info-value">Mon–Fri 9am–6pm</p>
          </div>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-main-grid">

          <div className="contact-form-card">
            <div className="contact-form-header">
              <h2>Send us a message</h2>
              <p>We reply to all messages within 24 hours</p>
            </div>

            {status === 'success' && (
              <div className="contact-success">
                <span>✅</span>
                <div>
                  <p className="contact-success-title">Message sent successfully!</p>
                  <p className="contact-success-sub">We will get back to you at {formData.user_email || 'your email'} within 24 hours.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="contact-error-msg">
                ❌ Something went wrong. Please email us directly at info@pawfind.com
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your full name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="your@email.com"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="+94 XX XXX XXXX"
                    value={formData.user_phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="Adoption enquiry">Adoption enquiry</option>
                    <option value="Application status">Application status</option>
                    <option value="Pet care question">Pet care question</option>
                    <option value="Donation">Donation</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                />
              </div>

              <button type="submit" className="contact-submit-btn" disabled={loading}>
                {loading
                  ? <span className="contact-btn-loading">Sending... ⏳</span>
                  : <span>Send Message 📨</span>
                }
              </button>
            </form>
          </div>

          <div className="contact-side">
            <div className="contact-map-card">
              <div className="contact-map-header">
                <h3>📍 Find us here</h3>
              </div>
              <div className="contact-map-body">
                <div className="contact-map-pin">🗺️</div>
                <p className="contact-map-name">PawFind Animal Shelter</p>
                <p className="contact-map-addr">123 Shelter Road, Colombo 03</p>
                <p className="contact-map-addr">Western Province, Sri Lanka</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-map-btn"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>

            <div className="contact-social-card">
              <h3>Connect with us</h3>
              <div className="contact-social-list">
                <a href="mailto:info@pawfind.com" className="contact-social-item">
                  <span>📧</span>
                  <div>
                    <p>Email</p>
                    <span>info@pawfind.com</span>
                  </div>
                </a>
                <a href="tel:+94112345678" className="contact-social-item">
                  <span>📞</span>
                  <div>
                    <p>Phone</p>
                    <span>+94 11 234 5678</span>
                  </div>
                </a>
                <a href="tel:+94771234567" className="contact-social-item">
                  <span>📱</span>
                  <div>
                    <p>Mobile / WhatsApp</p>
                    <span>+94 77 123 4567</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="contact-faq-card">
              <h3>Quick answers</h3>
              <div className="contact-faq-list">
                <div className="contact-faq-item">
                  <p className="contact-faq-q">⏱ How long does adoption take?</p>
                  <p className="contact-faq-a">Usually 3–5 working days after submission.</p>
                </div>
                <div className="contact-faq-item">
                  <p className="contact-faq-q">💉 Are all pets vaccinated?</p>
                  <p className="contact-faq-a">Yes — all have complete vaccination records.</p>
                </div>
                <div className="contact-faq-item">
                  <p className="contact-faq-q">🏠 Can I visit before adopting?</p>
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