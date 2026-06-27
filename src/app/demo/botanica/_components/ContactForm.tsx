'use client';

import { useState } from 'react';
import type { Dict } from '../_i18n';

type F = Dict['contact']['form'];

export default function ContactForm({ t }: { t: F }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: t.topics[0],
    message: '',
  });
  const [sent, setSent] = useState(false);

  function update(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // 純前端 Demo：不串接後端
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--bo-line)] bg-[var(--bo-surface)] px-8 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bo-leaf)] text-2xl text-white">
          ✓
        </div>
        <h3 className="mt-5 font-[family-name:var(--font-serif-tc)] text-2xl text-[var(--bo-ink)]">
          {t.successTitle}
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-[var(--bo-sub)]">
          {t.successBody}
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: '', email: '', topic: t.topics[0], message: '' });
            setSent(false);
          }}
          className="mt-7 rounded-full border border-[var(--bo-leaf)] px-6 py-2 text-sm font-medium text-[var(--bo-leaf)] transition-colors hover:bg-[var(--bo-leaf)] hover:text-white"
        >
          {t.again}
        </button>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-xl border border-[var(--bo-line)] bg-[var(--bo-surface)] px-4 py-3 text-[var(--bo-ink)] outline-none transition-colors placeholder:text-[var(--bo-faint)] focus:border-[var(--bo-leaf)]';
  const labelCls = 'mb-1.5 block text-sm font-medium text-[var(--bo-sub)]';

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-[var(--bo-line)] bg-[var(--bo-surface)] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={update}
            className={inputCls}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="topic" className={labelCls}>
          {t.topic}
        </label>
        <select
          id="topic"
          name="topic"
          value={form.topic}
          onChange={update}
          className={inputCls}
        >
          {t.topics.map((tp) => (
            <option key={tp}>{tp}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelCls}>
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={update}
          placeholder={t.placeholderMsg}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[var(--bo-ink)] px-6 py-3.5 font-medium text-[var(--bo-bg)] transition-colors hover:bg-[var(--bo-leaf)]"
      >
        {t.send}
      </button>
      <p className="mt-3 text-center text-xs text-[var(--bo-faint)]">{t.note}</p>
    </form>
  );
}
