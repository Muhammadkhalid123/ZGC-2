import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (formData.phone.length < 10) {
      tempErrors.phone = 'Please enter a valid phone number (at least 10 digits).';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message details are required.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-charcoal text-linen p-8 lg:p-10 border border-white/10 shadow-xl rounded-md">
      {status === 'success' ? (
        <div className="text-center py-8 space-y-4">
          <svg className="w-16 h-16 text-brand-green mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-2xl font-semibold text-brand-green">Message Sent Successfully</h3>
          <p className="text-sm text-linen/70 max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out to Zain Group of Companies. Our real estate representative will contact you shortly.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-4 text-xs font-bold tracking-widest uppercase text-brand-green hover:text-linen transition-colors border-b border-brand-green/30 pb-0.5"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-semibold text-white">Let's Discuss Your Property</h3>
            <p className="text-xs text-linen/50 tracking-wide uppercase">Leave a message & our experts will guide you</p>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="form-name" className="text-xs font-semibold tracking-wider uppercase text-linen/60 mb-2">Name</label>
              <input
                type="text"
                id="form-name"
                name="name"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="bg-transparent border-b border-linen/10 focus:border-brand-green py-2 text-sm text-linen focus:outline-none transition-colors duration-300 placeholder:text-linen/25"
              />
              {errors.name && <span className="text-xs text-red-400 mt-1">{errors.name}</span>}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="form-phone" className="text-xs font-semibold tracking-wider uppercase text-linen/60 mb-2">Phone Number</label>
              <input
                type="tel"
                id="form-phone"
                name="phone"
                placeholder="E.G. 0330 2382380"
                value={formData.phone}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="bg-transparent border-b border-linen/10 focus:border-brand-green py-2 text-sm text-linen focus:outline-none transition-colors duration-300 placeholder:text-linen/25"
              />
              {errors.phone && <span className="text-xs text-red-400 mt-1">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="form-email" className="text-xs font-semibold tracking-wider uppercase text-linen/60 mb-2">Email</label>
              <input
                type="email"
                id="form-email"
                name="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="bg-transparent border-b border-linen/10 focus:border-brand-green py-2 text-sm text-linen focus:outline-none transition-colors duration-300 placeholder:text-linen/25"
              />
              {errors.email && <span className="text-xs text-red-400 mt-1">{errors.email}</span>}
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label htmlFor="form-message" className="text-xs font-semibold tracking-wider uppercase text-linen/60 mb-2">Message</label>
              <textarea
                id="form-message"
                name="message"
                rows={4}
                placeholder="TELL US WHAT YOU'RE LOOKING FOR"
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="bg-transparent border-b border-linen/10 focus:border-brand-green py-2 text-sm text-linen focus:outline-none transition-colors duration-300 resize-none placeholder:text-linen/25"
              ></textarea>
              {errors.message && <span className="text-xs text-red-400 mt-1">{errors.message}</span>}
            </div>
          </div>

          {status === 'error' && (
            <div className="text-xs text-red-400 font-medium">
              Failed to submit the form. Please try again or call us directly.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-brand-green text-white hover:bg-white hover:text-charcoal py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm disabled:opacity-50"
          >
            {status === 'loading' ? 'SUBMITTING...' : 'SEND MESSAGE'}
          </button>
        </form>
      )}
    </div>
  );
}
