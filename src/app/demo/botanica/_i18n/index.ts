// 多語系入口：集中管理可用語系與字典取用
import zh, { type Dict } from './zh';
import en from './en';

export const locales = ['zh', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = 'zh';

const dictionaries: Record<Lang, Dict> = { zh, en };

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}

// 各語系顯示用標籤
export const langLabel: Record<Lang, string> = { zh: '中', en: 'EN' };

export type { Dict };
