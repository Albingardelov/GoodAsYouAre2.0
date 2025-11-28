import './Page.css'
import { useState } from 'react'
import SEO from '../components/SEO'
import { useContact } from '../hooks/useStrapi'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const {
    data: contactData,
    isLoading,
  } = useContact()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    privacyAccepted: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.privacyAccepted) {
      alert('Du måste acceptera privacy policy för att skicka formuläret')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS configuration - these will need to be set in .env
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured. Please add VITE_EMAILJS_* variables to .env file')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        message: '',
        privacyAccepted: false,
      })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact - Good As You Are"
        description="Get in touch with Good As You Are. Book a session, ask questions, or learn more about ACT Therapy, Motivation Coaching, and Lectures on Narcissism."
        keywords="Contact Good As You Are, Book Therapy Session, ACT Therapy Contact, Therapy Sweden"
        url="https://www.goodasyouare.com/contact"
      />
      <div className="page">
      <div className="page-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="page-content">
            {contactData?.attributes?.title && (
              <h1>{contactData.attributes.title}</h1>
            )}

            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    {contactData?.attributes?.nameLabel || 'Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    {contactData?.attributes?.emailLabel || 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    {contactData?.attributes?.messageLabel || 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      {contactData?.attributes?.privacyPolicyText || 
                        'I accept the privacy policy'}
                    </span>
                  </label>
                </div>

                {submitStatus === 'success' && (
                  <div style={{ 
                    padding: '1rem', 
                    marginBottom: '1rem', 
                    background: '#d4edda', 
                    color: '#155724', 
                    borderRadius: '8px',
                    border: '1px solid #c3e6cb'
                  }}>
                    {contactData?.attributes?.successMessage || 
                      'Tack! Ditt meddelande har skickats.'}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div style={{ 
                    padding: '1rem', 
                    marginBottom: '1rem', 
                    background: '#f8d7da', 
                    color: '#721c24', 
                    borderRadius: '8px',
                    border: '1px solid #f5c6cb'
                  }}>
                    {contactData?.attributes?.errorMessage || 
                      'Ett fel uppstod. Försök igen senare.'}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? 'Skickar...' 
                    : contactData?.attributes?.submitButtonText || 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Contact
