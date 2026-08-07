"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "登入失敗");
      return;
    }

    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold mb-6">管理後台登入</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密碼"
          autoFocus
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 mb-4 outline-none focus:border-sky-500"
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-all"
        >
          {loading ? "登入中..." : "登入"}
        </button>
      </form>
    </div>
  );
}
