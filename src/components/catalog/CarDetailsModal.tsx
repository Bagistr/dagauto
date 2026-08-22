'use client';

import React, { useState } from 'react';
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
import { calculateMurabaha } from '@/lib/murabahaCalculator';
import { calculateCustomsAndLegalization } from '@/lib/customsCalculator';
import { 
  X, 
  Video, 
  Volume2, 
  ShieldCheck, 
  Repeat, 
  Coins, 
  MessageCircle, 
  Send, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Sliders,
  Flame,
  Fuel,
  Zap,
  BadgeCheck
} from 'lucide-react';

interface CarDetailsModalProps {
  car: Car;
  onClose: () => void;
  onOpenBarterModal?: (car: Car) => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  car,
  onClose,
  onOpenBarterModal,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'sto' | 'customs' | 'murabaha' | 'barter'>('overview');
  const [isPlayingColdStart, setIsPlayingColdStart] = useState(false);
  const [isPlayingExhaust, setIsPlayingExhaust] = useState(false);

  // Murabaha interactive calculation
  const [downPaymentPercent, setDownPaymentPercent] = useState(car.murabaha.minDownPaymentPercent || 30);
  const [termMonths, setTermMonths] = useState(car.murabaha.maxTermMonths || 36);
  const [partnerFund, setPartnerFund] = useState<'LARiba' | 'MZHK' | 'PRIVATE_ISLAMIC_POOL'>('LARiba');
  const [murabahaLeadSent, setMurabahaLeadSent] = useState(false);
  const [murabahaApplicantName, setMurabahaApplicantName] = useState('');
  const [murabahaApplicantPhone, setMurabahaApplicantPhone] = useState('');

  // Barter offer local state
  const [barterMyCar, setBarterMyCar] = useState('');
  const [barterSurcharge, setBarterSurcharge] = useState('');
  const [barterOfferSent, setBarterOfferSent] = useState(false);

  const regBadge = getRegistrationBadge(car.registration.type);
  const bodyBadge = getBodyConditionLabel(car.bodyCondition);
  const waLink = generateWhatsAppLink(car.seller.whatsappPhone, car.title, car.price);
  const tgLink = generateTelegramLink(car.seller.telegramUsername, car.title);

  // Customs calculations for this car
  const customsResult = calculateCustomsAndLegalization({
    country: car.registration.type,
    carAge: car.year >= 2022 ? 'LESS_THAN_3' : '3_TO_5',
    engineVolume: car.engineVolume,
    enginePowerHp: car.enginePower,
    engineType: 'PETROL',
    declaredValueUsd: Math.round(car.price / 92),
    isCommercialResale: true,
  });

  // Murabaha result for this car
  const murabahaResult = calculateMurabaha({
    carPrice: car.price,
    downPaymentPercent,
    termMonths,
    partnerFund,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900 my-auto">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${regBadge.badgeClass}`}>
              {regBadge.flag} {regBadge.label}
            </div>
            <span className="text-xs text-slate-400">ID: {car.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Top Grid: Gallery + Quick Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Gallery (Left Col) */}
            <div className="md:col-span-7 space-y-3">
              {/* Active Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={car.media.images[activeImageIndex] || car.media.images[0]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />

                {/* Cold start video overlay button */}
                {car.media.coldStartVideoUrl && (
                  <button
                    onClick={() => setIsPlayingColdStart(!isPlayingColdStart)}
                    className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-transform active:scale-95"
                  >
                    <Video className="w-4 h-4" />
                    <span>{isPlayingColdStart ? 'Скрыть видео' : 'Холодный пуск (Видео)'}</span>
                  </button>
                )}

                {/* Exhaust audio overlay button */}
                {car.media.exhaustAudioUrl && (
                  <button
                    onClick={() => setIsPlayingExhaust(!isPlayingExhaust)}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md transition-transform active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlayingExhaust ? 'Остановить' : 'Звук выхлопа'}</span>
                  </button>
                )}
              </div>

              {/* Simulated Cold Start Player Notification */}
              {isPlayingColdStart && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Видео: <strong>Запуск на холодную (0 об/мин → прогрев)</strong>. Двигатель работает ровно.</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-rose-600 text-white font-bold rounded">1080p</span>
                </div>
              )}

              {isPlayingExhaust && (
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-800 flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Аудио: <strong>Звук выхлопа под нагрузкой</strong>. Басовитый чистый тембр.</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-orange-600 text-white font-bold rounded">Hi-Fi</span>
                </div>
              )}

              {/* Image Thumbnails */}
              {car.media.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {car.media.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Фото ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Summary Info (Right Col) */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-1.5">
                  {car.title}
                </h1>
                
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {car.city}
                  </span>
                  <span>•</span>
                  <span>{car.year} г.</span>
                  <span>•</span>
                  <span>{formatMileage(car.mileage)}</span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
                  <div className="text-xs text-slate-500 mb-0.5">Стоимость автомобиля:</div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {formatPrice(car.price)}
                  </div>
                  
                  {car.murabaha.available && (
                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Халяль-рассрочка:</span>
                      <span className="font-bold text-emerald-700">
                        от {formatPrice(murabahaResult.monthlyPayment)} / мес
                      </span>
                    </div>
                  )}
                </div>

                {/* Caucasus Standard Trust Highlights */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Кузов и окрас:
                    </span>
                    <span className={`font-bold px-2 py-0.5 rounded ${bodyBadge.color}`}>
                      {bodyBadge.label}
                    </span>
                  </div>

                  {car.stoInspection && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      <span className="flex items-center gap-1.5 font-medium">
                        <BadgeCheck className="w-4 h-4 text-emerald-600" /> Проверка в СТО:
                      </span>
                      <span className="font-bold text-emerald-700">
                        {car.stoInspection.overallScore}% ({car.stoInspection.stoName})
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-slate-600">Верификация:</span>
                    <div className="flex items-center gap-1.5">
                      {car.vouchRating.telegramVerified && (
                        <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-200">
                          Telegram ✓
                        </span>
                      )}
                      {car.vouchRating.gosuslugiVerified && (
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                          Госуслуги ✓
                        </span>
                      )}
                      <span className="text-amber-600 font-bold">★ {car.vouchRating.sellerReputationScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct 1-Click Contacts */}
              <div className="space-y-2 pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Написать в WhatsApp</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={tgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 active:scale-95 transition-all shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </a>

                  <a
                    href={`tel:${car.seller.phone}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Позвонить</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation for Detailed Sections */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'overview' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Характеристики & Описание
              </button>

              <button
                onClick={() => setActiveTab('customs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'customs' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Иностранный учёт & Дотаможка</span>
                <span className="px-1.5 py-0.2 bg-white/20 rounded text-[10px]">{car.registration.type}</span>
              </button>

              <button
                onClick={() => setActiveTab('barter')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'barter' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Repeat className="w-3.5 h-3.5 text-amber-300" />
                <span>Умный бартер</span>
              </button>

              <button
                onClick={() => setActiveTab('murabaha')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'murabaha' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Coins className="w-3.5 h-3.5 text-emerald-200" />
                <span>Халяль-рассрочка (Мурабаха)</span>
              </button>

              {car.stoInspection && (
                <button
                  onClick={() => setActiveTab('sto')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeTab === 'sto' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-200" />
                  <span>Чек-лист СТО ({car.stoInspection.overallScore}%)</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: Overview & Specs */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Комментарий продавца:</h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed">
                  {car.description}
                </div>
              </div>

              {/* Regional Modifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Установленные доработки и опции:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {car.regionalMods.map((mod) => {
                    const info = getRegionalModInfo(mod);
                    return (
                      <div key={mod} className={`p-3 rounded-xl border flex items-center gap-2.5 ${info.tagClass}`}>
                        {mod === 'AIR_SUSPENSION' && <Sliders className="w-4 h-4 text-indigo-600" />}
                        {mod === 'AUDIO_SQ_SPL' && <Volume2 className="w-4 h-4 text-rose-600" />}
                        {(mod === 'LPG_WITH_MARK' || mod === 'LPG_WITHOUT_MARK') && <Fuel className="w-4 h-4 text-emerald-600" />}
                        {mod === 'EXHAUST_TUNING' && <Flame className="w-4 h-4 text-orange-600" />}
                        {mod === 'ENGINE_STAGE' && <Zap className="w-4 h-4 text-yellow-600" />}
                        <span className="text-xs font-bold">{info.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Paint Thickness Inspection Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
                  <span>Замеры ЛКП толщиномером (микроны):</span>
                  <span className="text-xs text-emerald-700 font-semibold">Заводская норма: 90–135 мкм</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {car.paintThickness.map((t, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                        t.isFactory
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <span className="font-medium text-slate-700 truncate">{t.part}</span>
                      <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                        {t.microns} мкм
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Foreign Registration & Legalization */}
          {activeTab === 'customs' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-base mb-1.5">
                  <span>{regBadge.flag}</span>
                  <span>Юридический статус учёта: {regBadge.label}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  {car.registration.customsDetails || regBadge.description}
                </p>
                {car.registration.proxyExpiresAt && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-100/70 border border-blue-300 text-xs text-blue-900 font-medium">
                    <span>Срок действия доверенности / ввоза:</span>
                    <strong className="text-slate-900 font-bold">{car.registration.proxyExpiresAt}</strong>
                  </div>
                )}
              </div>

              {/* Customs Breakdown Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Калькуляция расходов на получение РФ-номеров (СБКТС, ЭПТС, Утильсбор):</span>
                </h4>

                <div className="space-y-2 mb-4">
                  {customsResult.breakdown.map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500">{item.description}</div>
                      </div>
                      <div className="font-mono font-bold text-sm text-blue-700">
                        {formatPrice(item.amountRub)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-md">
                  <div>
                    <span className="text-xs text-slate-400 block">Итоговый бюджет оформления «под ключ»:</span>
                    <span className="text-xl font-black text-white">{formatPrice(customsResult.totalCostRub)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Авто с номерами РФ выйдет в:</span>
                    <span className="text-lg font-bold text-emerald-400">
                      {formatPrice(car.price + customsResult.totalCostRub)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Smart Barter */}
          {activeTab === 'barter' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-1">
                  <Repeat className="w-5 h-5 text-amber-600" />
                  <span>Условия бартера от владельца</span>
                </div>
                <p className="text-sm text-amber-950 font-medium mb-3">
                  {car.barter.notes || 'Владелец готов рассмотреть любые интересные варианты обмена.'}
                </p>

                {car.barter.desiredCars && car.barter.desiredCars.length > 0 && (
                  <div>
                    <span className="text-xs text-slate-500 block mb-1.5">Приоритетные варианты:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {car.barter.desiredCars.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-bold text-amber-900">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Offer Form */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Предложить встречный обмен продавцу:</h4>
                
                {barterOfferSent ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2">
                    <div className="font-bold text-sm flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Предложение отправлено продавцу в Telegram и WhatsApp!</span>
                    </div>
                    <p>Продавец получит уведомление с параметрами вашего авто и условиями доплаты.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Ваш автомобиль или объект недвижимости:
                      </label>
                      <input
                        type="text"
                        placeholder="Например: Lada Vesta NG 2023 г. 1.6 МТ Люкс (пробег 18 тыс км)"
                        value={barterMyCar}
                        onChange={(e) => setBarterMyCar(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Условия по доплате:
                      </label>
                      <input
                        type="text"
                        placeholder="Например: С моей доплатой 1 400 000 руб наличными"
                        value={barterSurcharge}
                        onChange={(e) => setBarterSurcharge(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button
                      onClick={() => setBarterOfferSent(true)}
                      disabled={!barterMyCar}
                      className="w-full py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 active:scale-95 transition-all disabled:opacity-50 shadow-md"
                    >
                      Отправить предложение обмена (Алгоритм Мэтчинга)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Islamic Murabaha Installment */}
          {activeTab === 'murabaha' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base mb-1">
                  <Coins className="w-5 h-5 text-emerald-600" />
                  <span>Исламская рассрочка (Мурабаха)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Прозрачная покупка без ростовщических процентов (Риба), без пеней за просрочку и скрытых комиссий. Одобрено Советом Алимов Республики Дагестан.
                </p>
              </div>

              {/* Sliders */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Down payment */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Первоначальный взнос:</span>
                      <strong className="text-emerald-700 font-bold">{downPaymentPercent}% ({formatPrice(murabahaResult.downPaymentAmount)})</strong>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={70}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      aria-label="Первоначальный взнос в процентах"
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  {/* Term */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Срок рассрочки:</span>
                      <strong className="text-emerald-700 font-bold">{termMonths} месяцев</strong>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={36}
                      step={6}
                      value={termMonths}
                      onChange={(e) => setTermMonths(Number(e.target.value))}
                      aria-label="Срок рассрочки в месяцах"
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="p-4 rounded-xl bg-white border border-emerald-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center shadow-sm">
                  <div>
                    <div className="text-[11px] text-slate-500">Ежемесячный платёж</div>
                    <div className="text-lg font-black text-emerald-700">{formatPrice(murabahaResult.monthlyPayment)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500">Наценка фонда</div>
                    <div className="text-lg font-bold text-slate-900">{formatPrice(murabahaResult.fixedMarkupAmount)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500">Наценка за весь срок</div>
                    <div className="text-lg font-bold text-slate-900">{murabahaResult.fixedMarkupPercent}%</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500">Итоговая стоимость</div>
                    <div className="text-lg font-bold text-slate-900">{formatPrice(murabahaResult.totalCarCostWithMurabaha)}</div>
                  </div>
                </div>

                {/* Lead Form */}
                {murabahaLeadSent ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                    <div className="font-bold text-sm mb-1 flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Заявка успешно направлена в фонд {murabahaResult.partnerFundName}!</span>
                    </div>
                    <p>Менеджер свяжется с вами в течение 15 минут для согласования договора Мурабаха.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={murabahaApplicantName}
                        onChange={(e) => setMurabahaApplicantName(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                      <input
                        type="tel"
                        placeholder="Телефон (+7 928 ...)"
                        value={murabahaApplicantPhone}
                        onChange={(e) => setMurabahaApplicantPhone(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      onClick={() => setMurabahaLeadSent(true)}
                      className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all shadow-md shadow-emerald-600/20"
                    >
                      Подать заявку на Халяль-рассрочку в 1 клик
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: Certified STO Inspection */}
          {activeTab === 'sto' && car.stoInspection && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg mb-1">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <span>Электронный сертификат СТО: {car.stoInspection.overallScore}/100</span>
                  </div>
                  <div className="text-xs text-slate-700">
                    Сертифицированный партнер: <strong>{car.stoInspection.stoName}</strong> ({car.stoInspection.city})
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Эксперт: {car.stoInspection.inspectorName} • Дата: {car.stoInspection.inspectionDate} • № {car.stoInspection.certificateId}
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xl shadow-sm">
                  {car.stoInspection.overallScore}%
                </div>
              </div>

              {/* Diagnostic Scores Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 mb-1">Кузов и геометрия</div>
                  <div className="text-xl font-black text-emerald-700">{car.stoInspection.bodyScore}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 mb-1">Двигатель и навесное</div>
                  <div className="text-xl font-black text-emerald-700">{car.stoInspection.engineScore}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 mb-1">АКПП / МКПП</div>
                  <div className="text-xl font-black text-emerald-700">{car.stoInspection.transmissionScore}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-500 mb-1">Ходовая часть</div>
                  <div className="text-xl font-black text-emerald-700">{car.stoInspection.suspensionScore}%</div>
                </div>
              </div>

              {/* Inspector notes */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-700 mb-1">Заключение эксперта:</div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {car.stoInspection.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
