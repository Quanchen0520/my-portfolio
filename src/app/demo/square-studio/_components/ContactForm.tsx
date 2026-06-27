'use client';

import { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = {
  name: '',
  email: '',
  type: '住宅空間設計',
  budget: '',
  message: '',
};

const types = ['住宅空間設計', '商業空間設計', '軟裝陳設', '設計顧問'];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
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
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#e7e2d9] bg-white px-8 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b5835a] text-2xl text-white">
          ✓
        </div>
        <h3 className="mt-5 font-[family-name:var(--font-serif-tc)] text-2xl text-[#1c1a17]">
          已收到您的需求
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-[#6b645c]">
          謝謝您，{form.name || '貴賓'}！我們將於 2 個工作天內回覆，與您安排初步洽談。
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
          className="mt-7 rounded-full border border-[#b5835a] px-6 py-2 text-sm font-medium text-[#a06f48] transition-colors hover:bg-[#b5835a] hover:text-white"
        >
          再填一筆
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-[#e7e2d9] bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="您的稱呼"
          name="name"
          value={form.name}
          onChange={update}
          placeholder="林先生"
          required
        />
        <Field
          label="電子信箱"
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="type">需求類型</Label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={update}
            className="w-full rounded-xl border border-[#e1dbd0] bg-white px-4 py-3 text-[#1c1a17] outline-none transition-colors focus:border-[#b5835a]"
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <Field
          label="預算範圍（選填）"
          name="budget"
          value={form.budget}
          onChange={update}
          placeholder="例如 NT$ 80–120 萬"
        />
      </div>

      <div className="mt-5">
        <Label htmlFor="message">空間與需求簡述</Label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={update}
          rows={4}
          required
          placeholder="坪數、屋況、期待風格、進場時間⋯⋯"
          className="w-full resize-none rounded-xl border border-[#e1dbd0] bg-white px-4 py-3 text-[#1c1a17] outline-none transition-colors placeholder:text-[#b3aaa0] focus:border-[#b5835a]"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[#1c1a17] px-6 py-3.5 font-medium text-[#f7f5f2] transition-colors hover:bg-[#332f29]"
      >
        送出需求
      </button>
      <p className="mt-3 text-center text-xs text-[#b3aaa0]">
        ＊此為展示用表單，送出後僅於前端顯示成功訊息
      </p>
    </form>
  );
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-[#4a443c]"
    >
      {children}
    </label>
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
      <Label htmlFor={name}>
        {label}
        {required && <span className="ml-0.5 text-[#b5835a]">*</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-[#e1dbd0] bg-white px-4 py-3 text-[#1c1a17] outline-none transition-colors placeholder:text-[#b3aaa0] focus:border-[#b5835a]"
      />
    </div>
  );
}
