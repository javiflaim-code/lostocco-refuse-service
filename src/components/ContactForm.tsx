'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { site } from '@/lib/site';

/**
 * The single swappable submit target. Set NEXT_PUBLIC_FORM_ENDPOINT to a
 * Formspree form URL (or any endpoint that accepts a JSON POST). With it unset
 * the form runs in demo mode: it validates and shows every state, but sends
 * nothing.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const serviceOptions = [
  { value: 'start-trash', label: 'Start Trash Service' },
  { value: 'dumpster', label: 'Rent a Dumpster' },
  { value: 'billing', label: 'Billing' },
  { value: 'other', label: 'Other' },
] as const;

type FieldName = 'service' | 'name' | 'phone' | 'address' | 'email' | 'message';
type Errors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const labels: Record<FieldName, string> = {
  service: 'What do you need',
  name: 'Your name',
  phone: 'Phone',
  address: 'Service address',
  email: 'Email',
  message: 'Anything else',
};

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};

  if (!values.service) errors.service = 'Pick what you need so we route this to the right person.';
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';

  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 10) errors.phone = 'Enter a 10-digit phone number so we can call you back.';

  if (values.address.trim().length < 5)
    errors.address = 'Enter the street address we would be servicing.';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Enter a valid email address.';

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[0.875rem] font-semibold text-warning">
      {message}
    </p>
  );
}

const inputClass =
  'min-h-[48px] w-full rounded-[14px] border-[3px] border-ink bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink/40';

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetService = searchParams.get('service');
  const preset = serviceOptions.find((option) => option.value === presetService)?.value ?? '';

  // `service` starts from the ?service= link and is only overridden once the
  // person actually picks something, so the preset needs no effect to apply.
  const [serviceChoice, setServiceChoice] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<Exclude<FieldName, 'service'>, string>>({
    name: '',
    phone: '',
    address: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const successRef = useRef<HTMLDivElement>(null);

  const values: Record<FieldName, string> = { ...fields, service: serviceChoice ?? preset };

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const update = (field: FieldName, value: string) => {
    if (field === 'service') {
      setServiceChoice(value);
    } else {
      setFields((current) => ({ ...current, [field]: value }));
    }
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: real people never fill this in.
    const formData = new FormData(event.currentTarget);
    if (formData.get('company-website')) {
      setStatus('success');
      return;
    }

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setStatus('submitting');

    if (!ENDPOINT) {
      // Demo mode — no endpoint configured yet.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus('success');
      return;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          service: serviceOptions.find((o) => o.value === values.service)?.label ?? values.service,
          _subject: `Website request — ${values.name}`,
        }),
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="card card-lift flex flex-col gap-4 p-6 outline-none xs:p-8"
      >
        <p className="display text-[0.875rem] text-forest">Got it</p>
        <h3 className="display text-subsection text-forest">Thanks — we have your request.</h3>
        <p className="text-lede">
          Someone from the office will get back to you during business hours, {site.hours.weekdays}{' '}
          If it is urgent, call{' '}
          <a
            href={site.phoneHref}
            className="font-semibold text-forest underline underline-offset-4"
          >
            {site.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setServiceChoice('');
            setFields({ name: '', phone: '', address: '', email: '', message: '' });
            setStatus('idle');
          }}
          className="display min-h-[48px] self-start rounded-full border-[3px] border-ink bg-paper px-6 text-[0.875rem] text-forest hover:bg-mint"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card flex flex-col gap-5 p-6 xs:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="display text-[0.875rem] text-forest">
          {labels.service}
        </label>
        <select
          id="service"
          name="service"
          required
          value={values.service}
          onChange={(event) => update('service', event.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? 'service-error' : undefined}
          className={inputClass}
        >
          <option value="">Choose one…</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError id="service-error" message={errors.service} />
      </div>

      <div className="grid gap-5 xs:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="display text-[0.875rem] text-forest">
            {labels.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="display text-[0.875rem] text-forest">
            {labels.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="203-555-0100"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={inputClass}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="display text-[0.875rem] text-forest">
          {labels.address}
        </label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="Street, town"
          value={values.address}
          onChange={(event) => update('address', event.target.value)}
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? 'address-error' : undefined}
          className={inputClass}
        />
        <FieldError id="address-error" message={errors.address} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="display text-[0.875rem] text-forest">
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="display text-[0.875rem] text-forest">
          {labels.message}{' '}
          <span className="font-body text-[0.875rem] font-semibold normal-case tracking-normal text-ink/75">
            (optional)
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'error' ? (
        <p
          role="alert"
          className="rounded-[14px] border-[3px] border-warning bg-paper px-4 py-3 text-[0.9375rem]"
        >
          That did not go through. Please try again, or call{' '}
          <a
            href={site.phoneHref}
            className="font-semibold text-forest underline underline-offset-4"
          >
            {site.phone}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="display min-h-[52px] rounded-full border-[3px] border-ink bg-forest px-7 text-base text-paper shadow-hard-ink transition-shadow hover:shadow-hard-amber disabled:cursor-wait disabled:opacity-70"
      >
        {status === 'submitting' ? 'Sending…' : 'Send request'}
      </button>

      <p className="text-[0.875rem] text-ink/70">
        Prefer the phone? Call{' '}
        <a href={site.phoneHref} className="font-semibold text-forest underline underline-offset-4">
          {site.phone}
        </a>
        , {site.hours.weekdays}
      </p>
    </form>
  );
}
