"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { Compass, Cpu, Smartphone } from "lucide-react";
import type { GalleryItem, Project } from "@/lib/projects";

type FormState = {
  id: number | null;
  slug: string;
  slugTouched: boolean;
  title: string;
  description: string;
  tech: string[];
  type: string;
  icon: string;
  sort_order: number;
  image_url: string | null;
  role: string;
  timeline: string;
  highlightsText: string;
  showDemo: boolean;
  demoUrl: string;
  showGithub: boolean;
  githubUrl: string;
  gallery: GalleryItem[];
};

const EMPTY_FORM: FormState = {
  id: null,
  slug: "",
  slugTouched: false,
  title: "",
  description: "",
  tech: [],
  type: "web",
  icon: "compass",
  sort_order: 0,
  image_url: null,
  role: "",
  timeline: "",
  highlightsText: "",
  showDemo: false,
  demoUrl: "",
  showGithub: false,
  githubUrl: "",
  gallery: [],
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  compass: Compass,
  smartphone: Smartphone,
  cpu: Cpu,
};

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
  const [techInput, setTechInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function flashSuccess(message: string) {
    setSuccess(message);
    if (successTimer.current) clearTimeout(successTimer.current);
    successTimer.current = setTimeout(() => setSuccess(""), 2500);
  }

  function startEdit(p: Project) {
    setForm({
      id: p.id,
      slug: p.slug,
      slugTouched: true,
      title: p.title,
      description: p.description,
      tech: p.tech,
      type: p.type,
      icon: p.icon,
      sort_order: p.sort_order,
      image_url: p.image_url,
      role: p.role ?? "",
      timeline: p.timeline ?? "",
      highlightsText: p.highlights.join("\n"),
      showDemo: Boolean(p.demo_url),
      demoUrl: p.demo_url ?? "",
      showGithub: Boolean(p.github_url),
      githubUrl: p.github_url ?? "",
      gallery: p.gallery,
    });
    setTechInput("");
    setError("");
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setTechInput("");
    setError("");
  }

  function handleTitleChange(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: f.slugTouched ? f.slug : slugify(value),
    }));
  }

  function addTech(raw: string) {
    const value = raw.trim();
    if (!value) return;
    setForm((f) => (f.tech.includes(value) ? f : { ...f, tech: [...f.tech, value] }));
    setTechInput("");
  }

  function removeTech(value: string) {
    setForm((f) => ({ ...f, tech: f.tech.filter((t) => t !== value) }));
  }

  function handleTechKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech(techInput);
    } else if (e.key === "Backspace" && techInput === "" && form.tech.length > 0) {
      removeTech(form.tech[form.tech.length - 1]);
    }
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      setForm((f) => ({ ...f, image_url: blob.url }));
    } catch {
      setError("圖片上傳失敗，請重試");
    } finally {
      setUploading(false);
    }
  }

  async function refreshProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects);
  }

  const slugValid = form.slug === "" || SLUG_PATTERN.test(form.slug);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slugValid) {
      setError("Slug 格式錯誤：只能用小寫英文、數字與連字號（-）");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      slug: form.slug.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      tech: form.tech,
      type: form.type,
      icon: form.icon,
      sort_order: Number(form.sort_order) || 0,
      image_url: form.image_url,
      role: form.role.trim() || null,
      timeline: form.timeline.trim() || null,
      highlights: form.highlightsText
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      demo_url: form.showDemo ? form.demoUrl.trim() || null : null,
      github_url: form.showGithub ? form.githubUrl.trim() || null : null,
      gallery: form.gallery,
    };

    const url = form.id ? `/api/projects/${form.id}` : "/api/projects";
    const method = form.id ? "PUT" : "POST";
    const wasEditing = Boolean(form.id);

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
    flashSuccess(wasEditing ? "已更新專案" : "已新增專案");
    resetForm();
  }

  async function handleDelete(id: number) {
    if (!confirm("確定要刪除這個專案嗎？")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      await refreshProjects();
      if (form.id === id) resetForm();
      flashSuccess("已刪除專案");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const SelectedIcon = ICONS[form.icon] ?? Compass;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 px-6 py-12">
      {success && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
          {success}
        </div>
      )}

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
            標題
            <input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            Slug（網址用，例如 my-project）
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value, slugTouched: true })}
              required
              className={`bg-slate-800 border rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500 ${
                form.slug && !slugValid ? "border-red-500" : "border-slate-700"
              }`}
            />
            {form.slug && !slugValid ? (
              <span className="text-xs text-red-400">只能用小寫英文、數字與連字號（-）</span>
            ) : (
              <span className="text-xs text-slate-500">輸入標題時會自動帶入，可手動修改</span>
            )}
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

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            Role（例如 Frontend Developer）
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400">
            Timeline（例如 2026 或 In Progress）
            <input
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-400 md:col-span-2">
            Highlights（一行一個重點）
            <textarea
              value={form.highlightsText}
              onChange={(e) => setForm({ ...form, highlightsText: e.target.value })}
              rows={3}
              placeholder={"例如：\n以動畫與分區資訊強化專案展示體驗。\n建立可擴充的專案卡片與分類結構。"}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
            />
          </label>

          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.showDemo}
                onChange={(e) => setForm({ ...form, showDemo: e.target.checked })}
                className="accent-sky-500"
              />
              顯示展示連結
            </label>
            {form.showDemo && (
              <input
                value={form.demoUrl}
                onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                placeholder="https://your-demo.vercel.app"
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.showGithub}
                onChange={(e) => setForm({ ...form, showGithub: e.target.checked })}
                className="accent-sky-500"
              />
              顯示 GitHub 連結
            </label>
            {form.showGithub && (
              <input
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/your/repo"
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-400 md:col-span-2">
            封面圖片
            <div className="flex items-center gap-4">
              {form.image_url ? (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image_url} alt="封面預覽" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image_url: null }))}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white text-xs w-5 h-5 rounded-full grid place-items-center"
                    aria-label="移除圖片"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-20 rounded-lg border border-dashed border-slate-700 grid place-items-center text-xs text-slate-600 shrink-0">
                  尚無圖片
                </div>
              )}
              <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 transition-all">
                {uploading ? "上傳中..." : form.image_url ? "更換圖片" : "選擇圖片"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleImageSelect}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <label className="flex flex-col gap-1 text-sm text-slate-400 md:col-span-2">
            技術標籤（Enter 或逗號新增一個，Backspace 刪除最後一個）
            <div className="flex flex-wrap items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus-within:border-sky-500">
              {form.tech.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 bg-sky-500/10 text-sky-300 text-xs px-2 py-1 rounded-full"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTech(t)}
                    className="hover:text-red-400"
                    aria-label={`移除 ${t}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                onBlur={() => addTech(techInput)}
                placeholder={form.tech.length === 0 ? "例如 Next.js" : ""}
                className="flex-1 min-w-[100px] bg-transparent outline-none text-slate-200 py-0.5"
              />
            </div>
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
            <div className="flex items-center gap-3">
              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none focus:border-sky-500"
              >
                <option value="compass">compass</option>
                <option value="smartphone">smartphone</option>
                <option value="cpu">cpu</option>
              </select>
              <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-slate-800 border border-slate-700">
                <SelectedIcon className="w-5 h-5 text-sky-400" />
              </span>
            </div>
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
              disabled={saving || uploading || (!!form.slug && !slugValid)}
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
