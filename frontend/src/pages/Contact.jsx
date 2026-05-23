import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import '../styles/Contact.css'

function Contact() {
  const form = useRef()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // For now we simulate sending — replace with real EmailJS keys later
    setTimeout(() => {
      setStatus('success')
      setLoading(false)
      form.current.reset()
    }, 1500)

    // When you have EmailJS account, replace setTimeout with:
    // emailjs.sendForm(
    //   'YOUR_SERVICE_ID',
    //   'YOUR_TEMPLATE_ID',
    //   form.current,
    //   'YOUR_PUBLIC_KEY'
    // ).then(() => {
    //   setStatus('success')
    //   setLoading(false)
    //   form.current.reset()
    // }).catch(() => {
    //   setStatus('error')
    //   setLoading(false)
    // })
  }

  return (
    <div className="contact-page">

      {/* HERO */}
      <div className="contact-hero">
        <h1>Get in touch</h1>
        <p>Have a question about adoption? We are here to help!</p>
      </div>

      <div className="contact-body">

        {/* CONTACT INFO CARDS */}
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">📧</div>
            <h3>Email us</h3>
            <p>info@pawfind.com</p>
            <p className="contact-info-sub">We reply within 24 hours</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">📞</div>
            <h3>Call us</h3>
            <p>+94 11 234 5678</p>
            <p className="contact-info-sub">Mon–Sat, 9am–5pm</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">📍</div>
            <h3>Visit us</h3>
            <p>123 Shelter Road</p>
            <p className="contact-info-sub">Colombo 03, Sri Lanka</p>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">⏰</div>
            <h3>Working hours</h3>
            <p>Mon–Fri: 9am–6pm</p>
            <p className="contact-info-sub">Sat–Sun: 10am–4pm</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form-wrap">
          <div className="contact-form-card">
            <h2>Send us a message</h2>
            <p className="contact-form-sub">Fill in the form and we will get back to you shortly</p>

            {status === 'success' && (
              <div className="contact-success">
                ✅ Message sent successfully! We will get back to you within 24 hours.
              </div>
            )}

            {status === 'error' && (
              <div className="contact-error">
                ❌ Something went wrong. Please try again or email us directly.
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label>Phone Number (optional)</label>
                <input
                  type="tel"
                  name="user_phone"
                  placeholder="+94 XX XXX XXXX"
                />
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
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  required
                  rows="5"
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message 📨'}
              </button>
            </form>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="contact-map">
            <div className="map-placeholder">
              <p className="map-icon">📍</p>
              <p className="map-title">PawFind Shelter</p>
              <p className="map-addr">123 Shelter Road, Colombo 03</p>
              <p className="map-addr">Sri Lanka</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="map-link"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact