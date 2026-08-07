"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";

type FormState = {
  id: number | null;
  slug: string;
  title: string;
  description: string;
  tech: string;
  type: string;
  icon: string;
  sort_order: number;
};

const EMPTY_FORM: FormState = {
  id: null,
  slug: "",
  title: "",
  description: "",
  tech: "",
  type: "web",
  icon: "compass",
  sort_order: 0,
};

export default function AdminDashboard({
  initialProjects,
  viewCounts,
}: {
  initialProjects: Project[];
  viewCounts: Record<string, number>;
}) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function startEdit(p: Project) {
    setForm({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      tech: p.tech.join(", "),
      type: p.type,
      icon: p.icon,
      sort_order: p.sort_order,
    });
    setError("");
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setError("");
  }

  async function refreshProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
      type: form.type,
      icon: form.icon,
      sort_order: Number(form.sort_order) || 0,
    };

    const url = form.id ? `/api/projects/${form.id}` : "/api/projects";
    const method = form.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "儲存失敗");
      return;
    }

    await refreshProjects();
    resetForm();
  }

  async function handleDelete(id: number) {
    if (!confirm("確定要刪除這個專案嗎？")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      await refreshProjects();
      if (form.id === id) resetForm();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">專案管理後台</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-red-400 transition-colors"
          >
            登出
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-10 grid gap-4 md:grid-cols-2"
        >
          <h2 className="md:col-span-2 text-lg font-semibold">
            {form.id ? `編輯專案 #${form.id}` : "新增專案"}
          </h2>

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            Slug（網址用，例如 my-project）
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            標題
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400 md:col-span-2">
            描述
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400 md:col-span-2">
            技術標籤（用逗號分隔，例如 Next.js, Tailwind CSS）
            <input
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            類型
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            >
              <option value="web">web</option>
              <option value="mobile">mobile</option>
              <option value="hardware">hardware</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            圖示
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            >
              <option value="compass">compass</option>
              <option value="smartphone">smartphone</option>
              <option value="cpu">cpu</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            排序（數字越小越前面）
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          {error && <p className="md:col-span-2 text-red-400 text-sm">{error}</p>}

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg transition-all"
            >
              {saving ? "儲存中..." : form.id ? "更新專案" : "新增專案"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-800 hover:bg-slate-700 px-6 py-2.5 rounded-lg transition-all border border-slate-700"
              >
                取消編輯
              </button>
            )}
          </div>
        </form>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 text-slate-400 text-left">
              <tr>
                <th className="px-4 py-3">標題</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">類型</th>
                <th className="px-4 py-3">瀏覽次數</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-slate-800">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-slate-400">{p.slug || "(空)"}</td>
                  <td className="px-4 py-3 text-slate-400">{p.type}</td>
                  <td className="px-4 py-3 text-slate-400">{viewCounts[p.slug] ?? 0}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-sky-400 hover:text-sky-300"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}