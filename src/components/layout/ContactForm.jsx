'use client';

import { useActionState } from 'react';
import Button from '@/components/ui/Button';
import PixelArt from '@/components/ui/PixelArt';
import { footer } from '@/content/home';
import { site } from '@/content/site';
import { sendNote } from '@/lib/contact';
import { beliefMark } from '@/lib/pixels';
import { cx } from '@/lib/cx';

const fieldClass =
  'mt-2 w-full rounded-lg border border-line bg-white/85 px-3.5 text-[15px] text-ink shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-150 placeholder:text-ink/35 focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-[#d4505b]/60';

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-[13.5px] font-medium tracking-[0.15px] text-ink/70">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[12.5px] font-medium text-[#c2414b]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// The footer's contact form: a short note to Sachin, sent to his inbox by a server action.
export default function ContactForm() {
  const { form } = footer;
  const [state, action, pending] = useActionState(sendNote, { status: 'idle' });
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const describe = (id) => (errors[id] ? `contact-${id}-error` : undefined);

  return (
    <div id="contact-form" className="rounded-2xl bg-surface p-2 shadow-frame">
      <div className="rounded-[7.14px] bg-canvas p-6 shadow-float md:p-8">
        <p className="flex items-center gap-3 font-pixel text-base font-medium leading-none tracking-[0.04em] text-pixel">
          <PixelArt pixels={beliefMark} width={17} height={18} />
          {form.label}
        </p>

        {state.status === 'sent' ? (
          <div role="status" className="mt-6">
            <p className="font-serif text-[clamp(26px,1.8vw,32px)] leading-[1.15] text-ink/80">{form.sentTitle}</p>
            <p className="mt-3 text-[15px] font-medium leading-6 text-ink/60">{form.sentBody}</p>
          </div>
        ) : (
          <form action={action} noValidate className="mt-6 flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contact-name" label={form.name} error={errors.name}>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  defaultValue={values.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describe('name')}
                  className={cx(fieldClass, 'h-11')}
                />
              </Field>
              <Field id="contact-email" label={form.email} error={errors.email}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                  defaultValue={values.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describe('email')}
                  className={cx(fieldClass, 'h-11')}
                />
              </Field>
            </div>
            <Field id="contact-message" label={form.message} error={errors.message}>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                maxLength={4000}
                placeholder={form.placeholder}
                defaultValue={values.message}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describe('message')}
                className={cx(fieldClass, 'block resize-y py-3 leading-6')}
              />
            </Field>

            {/* Hidden from people and screen readers. Bots fill it in, and their notes are dropped. */}
            <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button type="submit" disabled={pending} className="disabled:cursor-wait disabled:opacity-60">
                {pending ? form.sending : form.submit}
              </Button>
              <p className="text-[12.5px] font-medium leading-5 text-ink/50">{form.privacy}</p>
            </div>

            {state.status === 'error' ? (
              <p role="alert" className="text-[13.5px] font-medium leading-5 text-[#c2414b]">
                {form.failed}{' '}
                <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                  {site.email}
                </a>
                .
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
