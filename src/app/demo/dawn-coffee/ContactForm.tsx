'use client';

import { useState } from 'react';

type FormState = {
  name: string;
  phone: string;
  date: string;
  message: string;
};

const EMPTY: FormState = { name: '', phone: '', date: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 純前端 Demo：不串接後端，直接顯示成功訊息
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-8 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6f4e37] text-2xl text-white">
          ✓
        </div>
        <h3 className="mt-5 text-xl font-semibold text-neutral-800">
          已收到您的訊息
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-neutral-500">
          謝謝您，{form.name || '貴賓'}！我們會盡快與您聯繫，確認訂位與相關細節。
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setSubmitted(false);
          }}
          className="mt-7 rounded-full border border-neutral-300 px-6 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-[#6f4e37] hover:text-[#6f4e37]"
        >
          再填一筆
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="您的稱呼"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="王小姐"
          required
        />
        <Field
          label="聯絡電話"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="0912-345-678"
          required
        />
      </div>

      <div className="mt-5">
        <Field
          label="預約日期"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-neutral-600"
        >
          想對我們說的話
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="例如：想預約 4 位，靠窗座位⋯⋯"
          className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#6f4e37]"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[#6f4e37] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#5a3f2c]"
      >
        送出預約
      </button>
      <p className="mt-3 text-center text-xs text-neutral-400">
        ＊此為展示用表單，送出後僅於前端顯示成功訊息
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-neutral-600"
      >
        {label}
        {required && <span className="ml-0.5 text-[#6f4e37]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#6f4e37]"
      />
    </div>
  );
}
