'use client';

import React, { useState } from 'react';
import { Car } from '@/types/car';
import { MOCK_CARS } from '@/data/mockCars';
import { formatPrice, formatMileage, getRegistrationBadge, generateWhatsAppLink, generateTelegramLink } from '@/lib/utils';
import { 
  Repeat, 
  Heart, 
  X, 
  Sparkles, 
  MessageCircle, 
  Send, 
  ArrowRightLeft, 
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartBarterViewProps {
  onSelectCar: (car: Car) => void;
}

export const SmartBarterView: React.FC<SmartBarterViewProps> = ({
  onSelectCar,
}) => {
  // User's own car profile
  const [myCarMake, setMyCarMake] = useState('Lada');
  const [myCarModel, setMyCarModel] = useState('Vesta NG');
  const [myCarPrice, setMyCarPrice] = useState(1480000);
  const [myCarBudgetSurcharge, setMyCarBudgetSurcharge] = useState(1300000);
  const [exchangeMode, setExchangeMode] = useState<'ALL' | 'KEY_TO_KEY' | 'WITH_MY_SURCHARGE' | 'WITH_THEIR_SURCHARGE' | 'REAL_ESTATE'>('WITH_MY_SURCHARGE');

  // Swipe state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedCar, setMatchedCar] = useState<Car | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Available cars accepting barter
  const barterCars = MOCK_CARS.filter(c => c.barter.acceptsBarter);
  const currentCard = barterCars[currentIndex % barterCars.length];

  const handleSwipe = (action: 'like' | 'pass') => {
    if (action === 'like') {
      setSwipeDirection('right');
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setMatchedCar(currentCard);
        setSwipeDirection(null);
      }, 250);
    } else {
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
      }, 200);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-3 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>АЛГОРИТМ «УМНЫЙ БАРТЕР»</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Tinder для автомобилей Дагестана 🔄
          </h1>

          <p className="text-sm text-white/90 leading-relaxed font-medium">
            Укажите свой автомобиль и желаемые условия (ключ в ключ, с доплатой или на недвижимость). Наш алгоритм находит встречные варианты и моментально соединяет вас с продавцом.
          </p>
        </div>
      </div>

      {/* Control Panel: "Что у вас есть" vs "Формат обмена" */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* User Vehicle Settings (Left 5 Cols) */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4" /> Ваш автомобиль
            </span>
            <span className="text-[11px] text-slate-500 font-medium">05 регион</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Марка и Модель:</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={myCarMake}
                  onChange={(e) => setMyCarMake(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  placeholder="Lada"
                />
                <input
                  type="text"
                  value={myCarModel}
                  onChange={(e) => setMyCarModel(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  placeholder="Vesta NG"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Оценка авто (₽):</label>
                <input
                  type="number"
                  value={myCarPrice}
                  onChange={(e) => setMyCarPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Готов доплатить (₽):</label>
                <input
                  type="number"
                  value={myCarBudgetSurcharge}
                  onChange={(e) => setMyCarBudgetSurcharge(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Тип бартера:</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setExchangeMode('WITH_MY_SURCHARGE')}
                  className={`p-2 rounded-xl border font-bold text-left transition-all ${
                    exchangeMode === 'WITH_MY_SURCHARGE'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  С моей доплатой
                </button>

                <button
                  onClick={() => setExchangeMode('KEY_TO_KEY')}
                  className={`p-2 rounded-xl border font-bold text-left transition-all ${
                    exchangeMode === 'KEY_TO_KEY'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ключ в ключ
                </button>

                <button
                  onClick={() => setExchangeMode('WITH_THEIR_SURCHARGE')}
                  className={`p-2 rounded-xl border font-bold text-left transition-all ${
                    exchangeMode === 'WITH_THEIR_SURCHARGE'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  С их доплатой
                </button>

                <button
                  onClick={() => setExchangeMode('REAL_ESTATE')}
                  className={`p-2 rounded-xl border font-bold text-left transition-all ${
                    exchangeMode === 'REAL_ESTATE'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  На недвижимость
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe Card Deck (Right 7 Cols) */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          {currentCard ? (
            <div className="w-full max-w-md space-y-4">
              
              {/* Tinder Card */}
              <div 
                className={`relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-300 transform ${
                  swipeDirection === 'right' ? 'translate-x-32 rotate-6 opacity-0' : swipeDirection === 'left' ? '-translate-x-32 -rotate-6 opacity-0' : ''
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={currentCard.media.images[0]}
                    alt={currentCard.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="px-3 py-1 rounded-xl text-xs font-black bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                      <Repeat className="w-3.5 h-3.5" />
                      <span>ИЩЕТ БАРТЕР</span>
                    </div>

                    <div className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white/95 text-slate-900 shadow-sm">
                      {getRegistrationBadge(currentCard.registration.type).flag} {getRegistrationBadge(currentCard.registration.type).label}
                    </div>
                  </div>

                  {/* Car Quick Specs Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-2xl font-black mb-0.5">{currentCard.title}</div>
                    <div className="flex items-center gap-2 text-xs text-white/90 font-medium">
                      <span>{currentCard.year} г.</span>
                      <span>•</span>
                      <span>{formatMileage(currentCard.mileage)}</span>
                      <span>•</span>
                      <span>{currentCard.city}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Barter Conditions */}
                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Стоимость авто:</div>
                      <div className="text-2xl font-black text-slate-900">{formatPrice(currentCard.price)}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-500">Расчётная доплата:</div>
                      <div className="text-lg font-bold text-amber-600">
                        {currentCard.price > myCarPrice 
                          ? `+ ${formatPrice(currentCard.price - myCarPrice)}` 
                          : `- ${formatPrice(myCarPrice - currentCard.price)}`}
                      </div>
                    </div>
                  </div>

                  {/* Seller Barter Wish */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                    <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Что хочет продавец:
                    </div>
                    <p className="leading-relaxed">
                      {currentCard.barter.notes || 'Рассматривает равноценный обмен или с доплатой.'}
                    </p>
                  </div>

                  {/* Action Buttons: Pass vs Barter Like */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => handleSwipe('pass')}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-sm border border-slate-200 transition-all"
                    >
                      <X className="w-5 h-5 text-rose-500" />
                      <span>Пропустить</span>
                    </button>

                    <button
                      onClick={() => handleSwipe('like')}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all"
                    >
                      <Heart className="w-5 h-5 fill-slate-950" />
                      <span>Хочу бартер!</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-md">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Вы просмотрели все предложения</h3>
              <p className="text-xs text-slate-500 mb-4">Нажмите кнопку ниже, чтобы начать просмотр заново.</p>
              <button
                onClick={() => setCurrentIndex(0)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-sm"
              >
                Смотреть сначала
              </button>
            </div>
          )}
        </div>
      </div>

      {/* "IT'S A MATCH!" Celebration Modal */}
      {matchedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-amber-300 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-amber-600">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                АЛГОРИТМ СОШЁЛСЯ!
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                It&apos;s a Match! 🎉
              </h2>
              <p className="text-xs text-slate-600 mt-2">
                Владелец <strong className="text-slate-900">{matchedCar.title}</strong> ищет автомобиль, аналогичный вашему <strong className="text-amber-700">{myCarMake} {myCarModel}</strong>!
              </p>
            </div>

            {/* Match Comparison Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-left">
              <div>
                <div className="text-slate-500">Ваше предложение:</div>
                <div className="font-bold text-slate-900">{myCarMake} {myCarModel} ({formatPrice(myCarPrice)})</div>
                <div className="text-amber-700 font-semibold">+ Доплата {formatPrice(matchedCar.price - myCarPrice)}</div>
              </div>

              <div className="text-right">
                <div className="text-slate-500">Авто владельца:</div>
                <div className="font-bold text-slate-900">{matchedCar.title}</div>
                <div className="text-emerald-700 font-bold">{formatPrice(matchedCar.price)}</div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-2">
              <a
                href={generateWhatsAppLink(matchedCar.seller.whatsappPhone, `[БАРТЕР] Обмен ${matchedCar.title} на ${myCarMake} ${myCarModel} с доплатой`, matchedCar.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать в WhatsApp: «Салам, давай бартер!»</span>
              </a>

              <a
                href={generateTelegramLink(matchedCar.seller.telegramUsername, matchedCar.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Предложить в Telegram</span>
              </a>

              <button
                onClick={() => {
                  setMatchedCar(null);
                  setCurrentIndex((prev) => prev + 1);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 pt-2 font-medium"
              >
                Продолжить поиск других вариантов
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
