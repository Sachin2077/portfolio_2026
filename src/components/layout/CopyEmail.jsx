'use client';

import { useEffect, useState } from 'react';

const labels = {
  idle: 'Copy email',
  done: 'Email copied',
  error: "Couldn't copy the address. Select it and copy it yourself.",
};

export default function CopyEmail({ email, className }) {
  const [state, setState] = useState('idle');

  useEffect(() => {
    if (state === 'idle') return undefined;
    const timer = setTimeout(() => setState('idle'), 2400);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('done');
    } catch {
      setState('error');
    }
  };

  return (
    <button type="button" onClick={copy} aria-label="Copy email address" className={className}>
      <span aria-live="polite">{labels[state]}</span>
    </button>
  );
}
