// 集中定義品牌站專用的 CSS keyframes（一次注入，全站共用）
// 不寫進共用 globals.css，避免影響作品集其他頁面。
export default function Keyframes() {
  return (
    <style>{`
      @keyframes boPageIn {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes boFloatA {
        0%,100% { transform: translate(0,0) scale(1); }
        50%     { transform: translate(6%, -8%) scale(1.12); }
      }
      @keyframes boFloatB {
        0%,100% { transform: translate(0,0) scale(1); }
        50%     { transform: translate(-7%, 6%) scale(1.08); }
      }
      @keyframes boFloatC {
        0%,100% { transform: translate(0,0) scale(1); }
        50%     { transform: translate(5%, 7%) scale(1.15); }
      }
      @keyframes boShimmer {
        100% { transform: translateX(100%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .bo-aurora > span { animation: none !important; }
        [class*="animate-[boPageIn"] { animation: none !important; }
      }
    `}</style>
  );
}
