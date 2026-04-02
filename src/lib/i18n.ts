import i18n from '../content/i18n.json';

export type Lang = 'en' | 'ru' | 'uz';

type Localized<T> = { en: T; ru: T; uz: T };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getPath(root: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (!isObject(acc)) return undefined;
    return acc[key];
  }, root);
}

function isLocalized<T = unknown>(value: unknown): value is Localized<T> {
  if (!isObject(value)) return false;
  return 'en' in value && 'ru' in value && 'uz' in value;
}

export function tr(lang: Lang, path: string): string {
  const value = getPath(i18n, path);
  if (isLocalized<string>(value)) return value[lang] ?? value.en;
  if (typeof value === 'string') return value;
  return path;
}

export function trArray(lang: Lang, path: string): string[] {
  const value = getPath(i18n, path);
  if (isLocalized<string[]>(value)) return value[lang] ?? value.en;
  if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value as string[];
  return [];
}

export function trLocalized<T>(lang: Lang, value: Localized<T>): T {
  return value[lang] ?? value.en;
}

