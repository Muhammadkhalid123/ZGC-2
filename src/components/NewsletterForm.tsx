import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    // Basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Unable to connect. Please check your network.');
    }
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="text-sm text-brand-green font-medium bg-white/5 border border-brand-green/20 p-4 rounded-sm animate-fade-in">
          Thank you! You have successfully subscribed to our newsletter.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <div className="flex flex-row border-b border-white/15 focus-within:border-brand-green transition-colors duration-300 py-1">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              disabled={status === 'loading'}
              className="bg-transparent text-linen placeholder:text-linen/30 text-xs tracking-wider uppercase w-full py-2.5 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-brand-green hover:bg-white hover:text-charcoal text-white text-xs font-bold tracking-wider uppercase px-6 py-2.5 transition-all duration-300 rounded-sm disabled:opacity-50"
            >
              {status === 'loading' ? 'SENDING...' : 'SUBSCRIBE'}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-xs text-red-400 font-medium pt-1">{errorMessage}</p>
          )}
        </form>
      )}
    </div>
  );
}
