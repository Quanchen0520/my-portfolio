// Hero 動態背景：數團柔焦色塊緩慢漂移，營造有機的「呼吸」感。
// 純 CSS 動畫（keyframes 由 <Keyframes /> 提供），不需 JS。
export default function Aurora() {
  return (
    <div
      aria-hidden
      className="bo-aurora pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <span className="absolute -left-[10%] -top-[15%] h-[36rem] w-[36rem] rounded-full bg-[var(--bo-leaf)] opacity-[0.16] blur-3xl [animation:boFloatA_16s_ease-in-out_infinite]" />
      <span className="absolute right-[-12%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-[var(--bo-sage)] opacity-[0.18] blur-3xl [animation:boFloatB_20s_ease-in-out_infinite]" />
      <span className="absolute bottom-[-20%] left-[25%] h-[34rem] w-[34rem] rounded-full bg-[var(--bo-clay)] opacity-[0.12] blur-3xl [animation:boFloatC_24s_ease-in-out_infinite]" />
    </div>
  );
}
