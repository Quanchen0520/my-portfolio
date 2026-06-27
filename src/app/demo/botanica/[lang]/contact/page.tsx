import type { Metadata } from 'next';
import { MapPin, Mail, Instagram } from 'lucide-react';
import { getDict, isLang, type Lang } from '../../_i18n';
import Reveal from '../../_components/Reveal';
import SectionHeading from '../../_components/SectionHeading';
import ContactForm from '../../_components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return {
    title: d.contact.title,
    description: d.contact.lead,
    alternates: { canonical: `/demo/botanica/${lang}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const d = getDict(lang);

  const info = [
    { icon: MapPin, label: 'Studio', value: '台北市大同區植光街 12 號' },
    { icon: Mail, label: 'Email', value: 'hello@botanica.tw', href: 'mailto:hello@botanica.tw' },
    { icon: Instagram, label: 'Instagram', value: '@botanica.life', href: '#' },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow={d.contact.eyebrow}
        title={d.contact.title}
        desc={d.contact.lead}
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal>
            <h3 className="font-[family-name:var(--font-serif-tc)] text-lg font-bold text-[var(--bo-ink)]">
              {d.contact.infoTitle}
            </h3>
            <ul className="mt-6 space-y-6">
              {info.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bo-muted)] text-[var(--bo-leaf)]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--bo-faint)]">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 block text-[var(--bo-ink)] transition-colors hover:text-[var(--bo-leaf)]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-[var(--bo-ink)]">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-3">
          <Reveal delay={80}>
            <ContactForm t={d.contact.form} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
