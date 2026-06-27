import Link from 'next/link';

// Demo 用：固定在角落的「回服務頁」連結（不屬於官網本身）
export default function DemoBadge() {
  return (
    <Link
      href="/services"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#1c1a17]/90 px-4 py-2 text-xs font-medium text-[#f7f5f2] shadow-lg backdrop-blur transition-colors hover:bg-[#1c1a17]"
    >
      ← 回服務頁
    </Link>
  );
}
