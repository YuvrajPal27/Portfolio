import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Section from './Section';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent('Portfolio contact — ' + form.name);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Say hi. I'm down to collaborate, freelance, or chat about opportunities."
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl surface px-3 py-2 outline-none ring-0 focus:outline-none"
              placeholder="Ava Wilson"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl surface px-3 py-2 outline-none ring-0 focus:outline-none"
              placeholder="you@email.com"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-2xl surface px-3 py-2 outline-none ring-0 focus:outline-none"
            placeholder="Let's build something cool..."
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            Send <Mail size={16} />
          </button>
          {sent && (
            <p className="text-sm" style={{ color: '#10b981' }}>
              Draft opened in your mail app ✅
            </p>
          )}
        </div>
      </form>
    </Section>
  );
}
