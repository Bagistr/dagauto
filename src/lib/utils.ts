import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RegistrationCountry, BodyCondition, TrimLevel, RegionalMod } from "@/types/car";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(km: number): string {
  return new Intl.NumberFormat('ru-RU').format(km) + ' км';
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}

export function getRegistrationBadge(reg: RegistrationCountry): { label: string; badgeClass: string; flag: string; description: string } {
  switch (reg) {
    case 'RU':
      return {
        label: 'РФ Учёт',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
        flag: '🇷🇺',
        description: 'Чистый российский учёт, без ограничений и доплат'
      };
    case 'KG':
      return {
        label: 'KG (Киргизия / ЕАЭС)',
        badgeClass: 'bg-red-50 text-red-700 border-red-200',
        flag: '🇰🇬',
        description: 'Ввезен по ставкам ЕАЭС. Требуется уплата коммерческого утильсбора для переоформления'
      };
    case 'AM':
      return {
        label: 'AM (Армения)',
        badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
        flag: '🇦🇲',
        description: 'Армянский учёт. Доступна дотаможка или езда по доверенности'
      };
    case 'ABH':
      return {
        label: 'ABH (Абхазия)',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        flag: '🟢',
        description: 'Временный ввоз на фирму / Только по доверенности'
      };
    case 'OS':
      return {
        label: 'Южная Осетия',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        flag: '⚪',
        description: 'Учёт РЮО, передвижение по временному ввозу'
      };
    case 'NO_DOCS':
      return {
        label: 'Без документов / Снята',
        badgeClass: 'bg-zinc-100 text-zinc-700 border-zinc-200',
        flag: '⚠️',
        description: 'Под разбор, проект или восстановление'
      };
  }
}

export function getBodyConditionLabel(condition: BodyCondition): { label: string; color: string; desc: string } {
  switch (condition) {
    case 'NOT_BEATEN_NOT_PAINTED':
      return { label: 'Не бит / Не крашен', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', desc: '100% заводской окрас' };
    case 'COSMETIC_REFRESH':
      return { label: 'Освежалась', color: 'bg-amber-50 text-amber-700 border-amber-200', desc: 'Косметический вторичный окрас без шпатлевки' };
    case 'FULL_REPAINT':
      return { label: 'Полный перекрас', color: 'bg-purple-50 text-purple-700 border-purple-200', desc: 'Качественный облитый кузов' };
    case 'ARMOR_FILM':
      return { label: 'В бронеплёнке', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', desc: 'Кузов защищен дорогой антигравийной плёнкой' };
  }
}

export function getTrimLevelLabel(trim: TrimLevel): string {
  switch (trim) {
    case 'NORMA': return 'Норма';
    case 'LUX': return 'Люкс';
    case 'FULL_LUX': return 'Полный Люкс';
    case 'BLACK_EDITION': return 'Black Edition';
    case 'EXECUTIVE': return 'Executive';
    case 'SPORT': return 'Sport';
    case 'AMG_LINE': return 'AMG Line';
    case 'M_SPORT': return 'M Sport';
  }
}

export function getRegionalModInfo(mod: RegionalMod): { label: string; iconName: string; tagClass: string } {
  switch (mod) {
    case 'AIR_SUSPENSION':
      return { label: 'Пневмоподвеска', iconName: 'Sliders', tagClass: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    case 'AUDIO_SQ_SPL':
      return { label: 'Автозвук SPL', iconName: 'Volume2', tagClass: 'bg-rose-50 text-rose-700 border-rose-200' };
    case 'LPG_WITH_MARK':
      return { label: 'Газ (ГБО) с отметкой', iconName: 'Fuel', tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'LPG_WITHOUT_MARK':
      return { label: 'Газ (ГБО)', iconName: 'Fuel', tagClass: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'EXHAUST_TUNING':
      return { label: 'Тюнинг выхлопа', iconName: 'Flame', tagClass: 'bg-orange-50 text-orange-700 border-orange-200' };
    case 'ENGINE_STAGE':
      return { label: 'Stage прошивка', iconName: 'Zap', tagClass: 'bg-yellow-50 text-yellow-800 border-yellow-200' };
    case 'FULL_TINT':
      return { label: 'Тонировка бункер', iconName: 'EyeOff', tagClass: 'bg-slate-100 text-slate-800 border-slate-200' };
    case 'ARMOR_FILM':
      return { label: 'В бронеплёнке', iconName: 'Shield', tagClass: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
    case 'ARMORED_GLASS':
      return { label: 'Бронестёкла', iconName: 'Shield', tagClass: 'bg-blue-50 text-blue-700 border-blue-200' };
  }
}

export function generateWhatsAppLink(phone: string, carTitle: string, carPrice: number): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Салам алейкум! Пишу по поводу объявления на DagAuto: ${carTitle} за ${formatPrice(carPrice)}. Автомобиль ещё в продаже?`);
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

export function generateTelegramLink(username: string, carTitle: string): string {
  const cleanUser = username.replace('@', '');
  return `https://t.me/${cleanUser}`;
}
