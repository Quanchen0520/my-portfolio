import type { Metadata } from 'next';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { site } from '../_data/site';
import Reveal from '../_components/Reveal';
import SectionHeading from '../_components/SectionHeading';
import ContactForm from '../_components/ContactForm';

export const metadata: Metadata = {
  title: '聯絡我們',
  description:
    '想討論你的空間嗎？填寫需求表單或直接來電，方寸設計將盡快與你聯繫，安排初步洽談。',
  alternates: { canonical: '/demo/square-studio/contact' },
};

export default function ContactPage() {
  const info = [
    { icon: MapPin, label: '工作室', value: site.address },
    { icon: Clock, label: '營業時間', value: site.hours },
    { icon: Phone, label: '電話', value: site.phone, href: `tel:${site.phone}` },
    { icon: Mail, label: '信箱', value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="聊聊你的空間"
          desc="留下需求，我們會在 2 個工作天內回覆，與你安排免費的初步諮詢。"
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* 資訊 */}
          <div className="lg:col-span-2">
            <Reveal>
              <ul className="space-y-7">
                {info.map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#efece5] text-[#b5835a]">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#9a9087]">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-0.5 block text-[#1c1a17] transition-colors hover:text-[#b5835a]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-[#1c1a17]">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* 地圖示意 */}
            <Reveal delay={120}>
              <div className="mt-8 flex aspect-[3/2] items-center justify-center rounded-2xl border border-[#e7e2d9] bg-[#efece5] text-sm text-[#9a9087]">
                map placeholder
              </div>
            </Reveal>
          </div>

          {/* 表單 */}
          <div className="lg:col-span-3">
            <Reveal delay={80}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
