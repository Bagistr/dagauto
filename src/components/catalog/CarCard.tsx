'use client';

import React from 'react';
import { Car } from '@/types/car';
import { 
  formatPrice, 
  formatMileage, 
  getRegistrationBadge, 
  getBodyConditionLabel, 
  getRegionalModInfo,
  generateWhatsAppLink,
  generateTelegramLink
} from '@/lib/utils';
import { 
  MapPin, 
  Video, 
  ShieldCheck, 
  MessageCircle, 
  Send, 
  Phone, 
  Repeat, 
  BadgeCheck, 
  Sliders, 
  Volume2, 
  Fuel, 
  Flame, 
  Zap 
} from 'lucide-react';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
  onOpenBarterModal?: (car: Car) => void;
  onOpenCustomsModal?: (car: Car) => void;
  onOpenMurabahaModal?: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onSelect,
  onOpenBarterModal,
  onOpenCustomsModal,
  onOpenMurabahaModal,
}) => {
  const regBadge = getRegistrationBadge(car.registration.type);
  const bodyBadge = getBodyConditionLabel(car.bodyCondition);
  const waLink = generateWhatsAppLink(car.seller.whatsappPhone, car.title, car.price);
  const tgLink = generateTelegramLink(car.seller.telegramUsername, car.title);

  // Approximate Murabaha monthly payment calculation for badge
  const monthlyMurabahaApprox = car.murabaha.available
    ? Math.round(((car.price * 0.7) * 1.28) / 36)
    : 0;

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 overflow-hidden">
      
      {/* Media & Badges */}
      <div 
        onClick={() => onSelect(car)} 
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={car.media.images[0]}
          alt={car.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Top Badges overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
          {/* Registration badge */}
          <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md flex items-center gap-1.5 shadow-sm bg-white/95 ${regBadge.badgeClass}`}>
            <span>{regBadge.flag}</span>
            <span>{regBadge.label}</span>
          </div>

          {/* Caucasus Standard Badges */}
          <div className="flex items-center gap-1">
            {car.media.coldStartVideoUrl && (
              <div className="px-2 py-1 rounded-lg text-[11px] font-bold bg-white/95 text-rose-700 border border-rose-200 backdrop-blur-md flex items-center gap-1 shadow-sm">
                <Video className="w-3 h-3 text-rose-600" />
                <span>Холодный пуск</span>
              </div>
            )}

            {car.stoInspection && (
              <div className="px-2 py-1 rounded-lg text-[11px] font-bold bg-white/95 text-emerald-700 border border-emerald-200 backdrop-blur-md flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>СТО {car.stoInspection.overallScore}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom image overlay: City & Condition */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-medium pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {car.city}
          </span>
          <span className={`px-2 py-0.5 rounded-md font-semibold border backdrop-blur-sm bg-white/95 ${bodyBadge.color}`}>
            {bodyBadge.label}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-4">
        
        {/* Title, Year, Specs */}
        <div onClick={() => onSelect(car)} className="cursor-pointer">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
            {car.title}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
            <span>{car.year} г.</span>
            <span>•</span>
            <span>{formatMileage(car.mileage)}</span>
            <span>•</span>
            <span>{car.engineVolume}л ({car.enginePower} л.с.)</span>
            <span>•</span>
            <span>{car.transmission === 'AUTOMATIC' ? 'АКПП' : 'МКПП'}</span>
          </div>
        </div>

        {/* Regional Mods Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {car.regionalMods.slice(0, 3).map((mod) => {
            const info = getRegionalModInfo(mod);
            return (
              <span
                key={mod}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${info.tagClass}`}
              >
                {mod === 'AIR_SUSPENSION' && <Sliders className="w-3 h-3 text-indigo-600" />}
                {mod === 'AUDIO_SQ_SPL' && <Volume2 className="w-3 h-3 text-rose-600" />}
                {(mod === 'LPG_WITH_MARK' || mod === 'LPG_WITHOUT_MARK') && <Fuel className="w-3 h-3 text-emerald-600" />}
                {mod === 'EXHAUST_TUNING' && <Flame className="w-3 h-3 text-orange-600" />}
                {mod === 'ENGINE_STAGE' && <Zap className="w-3 h-3 text-yellow-600" />}
                {info.label}
              </span>
            );
          })}
          {car.regionalMods.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] text-slate-500 bg-slate-100 rounded border border-slate-200">
              +{car.regionalMods.length - 3}
            </span>
          )}
        </div>

        {/* Barter match hint if available */}
        {car.barter.acceptsBarter && (
          <div 
            onClick={() => onOpenBarterModal ? onOpenBarterModal(car) : onSelect(car)}
            className="mb-3 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition-colors"
          >
            <div className="flex items-center gap-1.5 font-medium truncate">
              <Repeat className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">
                {car.barter.notes || 'Возможен обмен (бартер)'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider shrink-0 ml-1">
              Обмен
            </span>
          </div>
        )}

        {/* Foreign Registration hint */}
        {car.registration.type !== 'RU' && (
          <div 
            onClick={() => onOpenCustomsModal ? onOpenCustomsModal(car) : onSelect(car)}
            className="mb-3 px-2.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between cursor-pointer hover:bg-blue-100/70 transition-colors"
          >
            <span className="truncate text-[11px]">
              Дотаможка на РФ: ~{car.registration.estimatedClearanceCost ? formatPrice(car.registration.estimatedClearanceCost) : 'расчёт онлайн'}
            </span>
            <span className="text-[10px] font-bold text-blue-700 underline shrink-0 ml-1">
              Калькулятор
            </span>
          </div>
        )}

        {/* Price & Installment */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {formatPrice(car.price)}
            </span>

            {car.murabaha.available && (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenMurabahaModal) onOpenMurabahaModal(car);
                  else onSelect(car);
                }}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
              >
                <span>от {formatPrice(monthlyMurabahaApprox)}/мес</span>
              </span>
            )}
          </div>

          {/* Action Contact Buttons */}
          <div className="flex items-center gap-1.5">
            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href={tgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 active:scale-95 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>

            {/* Direct Call */}
            <a
              href={`tel:${car.seller.phone}`}
              aria-label={`Позвонить продавцу ${car.seller.name}`}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
              title="Позвонить"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
