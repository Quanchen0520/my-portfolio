import { redirect } from 'next/navigation';
import { defaultLocale } from './_i18n';

// /demo/botanica → 導向預設語系
export default function BotanicaIndex() {
  redirect(`/demo/botanica/${defaultLocale}`);
}
