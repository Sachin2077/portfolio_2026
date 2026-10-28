'use server';

import { site } from '@/content/site';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Sends a note from the footer form to Sachin's inbox through Resend's email API.
// Needs RESEND_API_KEY. CONTACT_FROM must use a domain verified in Resend; until one is, Resend's test
// sender (onboarding@resend.dev) only delivers to the Resend account's own address. See .env.example.
export async function sendNote(_previous, formData) {
  const values = {
    name: String(formData.get('name') ?? '').trim().slice(0, 100),
    email: String(formData.get('email') ?? '').trim().slice(0, 200),
    message: String(formData.get('message') ?? '').trim().slice(0, 4000),
  };

  // A field people never see. Bots fill it in, so pretend their note went through.
  if (formData.get('company')) return { status: 'sent', name: values.name };

  const errors = {};
  if (!values.name) errors.name = 'Please enter your name.';
  if (!EMAIL.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (values.message.length < 10) errors.message = 'Please add a few more details about the project or role.';
  if (Object.keys(errors).length) return { status: 'invalid', errors, values };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('Contact form: RESEND_API_KEY is not set, so the note was not sent.');
    return { status: 'error', values };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || site.email],
        reply_to: values.email,
        subject: `New note from ${values.name.replace(/[\r\n]+/g, ' ')}`,
        text: `${values.message}\n\nFrom ${values.name} (${values.email}), sent from ${site.url}`,
      }),
    });
    if (!response.ok) throw new Error(`Resend answered ${response.status}: ${await response.text()}`);
    return { status: 'sent', name: values.name };
  } catch (error) {
    console.error('Contact form: the note was not sent.', error);
    return { status: 'error', values };
  }
}
