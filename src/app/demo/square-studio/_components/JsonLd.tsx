// 結構化資料（JSON-LD）注入元件 — 供各頁 SEO 使用
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // 內容為靜態假資料，安全
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
