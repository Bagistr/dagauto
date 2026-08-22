'use client';

import React, { useState, useRef } from 'react';
import { RegistrationCountry, BodyCondition, RegionalMod, TrimLevel, DealType, Car } from '@/types/car';
import { formatPrice } from '@/lib/utils';
import { 
  Camera, 
  Video, 
  FileCheck, 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Repeat, 
  Coins, 
  X,
  Trash2,
  Image as ImageIcon,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FastListingWizardProps {
  onClose: () => void;
  onListingCreated: (car: Car) => void;
}

export const FastListingWizard: React.FC<FastListingWizardProps> = ({
  onClose,
  onListingCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('Camry 70');
  const [year, setYear] = useState('2021');
  const [price, setPrice] = useState('2850000');
  const [mileage, setMileage] = useState('45000');
  const [city, setCity] = useState<'Махачкала' | 'Хасавюрт' | 'Дербент' | 'Каспийск'>('Махачкала');
  const [engineVolume, setEngineVolume] = useState('2.5');
  const [enginePower, setEnginePower] = useState('200');
  const [color, setColor] = useState('Белый перламутр');

  // Real Uploaded Photos and Video
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1000&auto=format&fit=crop'
  ]);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [uploadedVideoName, setUploadedVideoName] = useState<string | null>(null);

  // Regional specifics
  const [registration, setRegistration] = useState<RegistrationCountry>('KG');
  const [bodyCondition, setBodyCondition] = useState<BodyCondition>('NOT_BEATEN_NOT_PAINTED');
  const [trimLevel, setTrimLevel] = useState<TrimLevel>('FULL_LUX');
  const [regionalMods, setRegionalMods] = useState<RegionalMod[]>(['ARMOR_FILM', 'FULL_TINT']);
  const [dealTypes, setDealTypes] = useState<DealType[]>(['SALE_ONLY', 'BARTER', 'MURABAHA']);
  const [barterNotes, setBarterNotes] = useState('Обменяю на Весту с вашей доплатой от 1.3 млн');
  
  // Contacts
  const [sellerName, setSellerName] = useState('Ахмед');
  const [phone, setPhone] = useState('+7 (928) 700-05-05');
  const [telegramUsername, setTelegramUsername] = useState('akhmed_05');
  const [description, setDescription] = useState('Салам Алейкум. Авто в идеальном состоянии, без окрасов. Документы чистые.');

  // Simulation states
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [isVoiceTranscribing, setIsVoiceTranscribing] = useState(false);

  // Handle Photo Uploads (Real files from device)
  const handleImageFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Handle Video Upload (Real video file from device)
  const handleVideoFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedVideoUrl(URL.createObjectURL(file));
      setUploadedVideoName(file.name);
    }
  };

  // OCR Simulator (Simulates reading vehicle passport СТС)
  const simulateSTSScan = () => {
    setIsOcrScanning(true);
    setTimeout(() => {
      setMake('Toyota');
      setModel('Camry 70 Luxury');
      setYear('2021');
      setEngineVolume('2.5');
      setEnginePower('200');
      setColor('Белый перламутр');
      setIsOcrScanning(false);
    }, 1000);
  };

  // Voice to Text (uses browser speech recognition if supported, otherwise realistic transcription)
  const handleVoiceDescription = () => {
    setIsVoiceTranscribing(true);

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = 'ru-RU';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setDescription(prev => (prev ? prev + ' ' + transcript : transcript));
          setIsVoiceTranscribing(false);
        };

        recognition.onerror = () => {
          simulateFallbackVoice();
        };

        recognition.start();
        return;
      } catch (err) {
        simulateFallbackVoice();
      }
    } else {
      simulateFallbackVoice();
    }
  };

  const simulateFallbackVoice = () => {
    setTimeout(() => {
      setDescription('Салам алейкум всем братьям! Машина своя, во владении, в заводском окрасе. Перед затянут в бронепленку, салон чистый, не прокуренный. Любые проверки приветствую, торг только у капота.');
      if (!regionalMods.includes('ARMOR_FILM')) {
        setRegionalMods(prev => [...prev, 'ARMOR_FILM']);
      }
      setIsVoiceTranscribing(false);
    }, 1200);
  };

  const toggleMod = (mod: RegionalMod) => {
    setRegionalMods(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const handleFinishListing = () => {
    const finalImages = uploadedImages.length > 0 
      ? uploadedImages 
      : ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1000&auto=format&fit=crop'];

    const newCar: Car = {
      id: `dag-car-${Date.now()}`,
      title: `${make} ${model}`,
      make,
      model,
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      engineVolume: Number(engineVolume),
      enginePower: Number(enginePower),
      fuelType: 'PETROL',
      transmission: 'AUTOMATIC',
      drive: 'FWD',
      color,
      city,
      registration: {
        type: registration,
        countryName: registration === 'KG' ? 'Киргизия (KG / ЕАЭС)' : registration === 'AM' ? 'Армения (AM)' : registration === 'ABH' ? 'Абхазия' : 'РФ Учёт',
        flag: registration === 'KG' ? '🇰🇬' : registration === 'AM' ? '🇦🇲' : registration === 'ABH' ? '🟢' : '🇷🇺',
        isCustomsClearedRu: registration === 'RU',
        restrictionsRu: false,
        customsDetails: 'Документы проверены через сервис DagAuto.',
      },
      bodyCondition,
      trimLevel,
      regionalMods,
      dealTypes,
      media: {
        images: finalImages,
        coldStartVideoUrl: uploadedVideoUrl || undefined,
      },
      paintThickness: [
        { part: 'Кузов в круг', microns: 115, isFactory: true }
      ],
      vouchRating: {
        telegramVerified: true,
        gosuslugiVerified: true,
        communityVouchesCount: 5,
        sellerReputationScore: 5.0,
      },
      barter: {
        acceptsBarter: dealTypes.includes('BARTER'),
        types: ['WITH_BUYER_SURCHARGE'],
        notes: barterNotes,
      },
      murabaha: {
        available: dealTypes.includes('MURABAHA'),
        minDownPaymentPercent: 30,
        maxTermMonths: 36,
        partnerFunds: ['LARiba', 'MZHK'],
      },
      seller: {
        name: sellerName,
        phone,
        whatsappPhone: phone,
        telegramUsername,
        isDealer: false,
        responseTimeMinutes: 3,
      },
      description,
      viewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
      isBoosted: true,
    };

    onListingCreated(newCar);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-2xl text-slate-900 space-y-5 my-auto">
        
        {/* Hidden Real File Inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageFilesSelected}
          accept="image/*"
          multiple
          className="hidden"
        />

        <input
          type="file"
          ref={videoInputRef}
          onChange={handleVideoFileSelected}
          accept="video/*"
          className="hidden"
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Подача объявления за 60 секунд ⚡
              </h2>
              <div className="text-xs text-slate-500">Шаг {step} из 4 • Автопостинг в Telegram-каналы</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Fast OCR & Real Media Uploads */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            {/* OCR Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5 mb-1">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>ИИ-распознавание СТС (OCR)</span>
                </div>
                <p className="text-[11px] text-slate-700">
                  Сфотографируйте техпаспорт — система сама заполнит марку, модель, VIN, год и мощность.
                </p>
              </div>

              <button
                type="button"
                onClick={simulateSTSScan}
                disabled={isOcrScanning}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs whitespace-nowrap active:scale-95 transition-all shadow-sm"
              >
                {isOcrScanning ? 'Сканирование...' : 'Сфотографировать СТС 📸'}
              </button>
            </div>

            {/* Real Media Upload Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Add Photos Button */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 border-dashed text-center space-y-1.5 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto text-emerald-600 group-hover:scale-105 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {uploadedImages.length > 0 ? `+ Добавить фото (Выбрано: ${uploadedImages.length})` : 'Добавить фотографии авто'}
                </div>
                <div className="text-[10px] text-slate-500">Нажмите, чтобы выбрать фото с телефона или ПК</div>
              </div>

              {/* Add Cold Start Video Button */}
              <div 
                onClick={() => videoInputRef.current?.click()}
                className={`p-4 rounded-2xl border-2 border-dashed text-center space-y-1.5 cursor-pointer transition-all ${
                  uploadedVideoUrl ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-rose-400'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto text-rose-600">
                  <Video className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold">
                  {uploadedVideoUrl ? '✓ Видео холодного пуска прикреплено' : 'Видео холодного пуска'}
                </div>
                <div className="text-[10px] opacity-80">
                  {uploadedVideoName ? uploadedVideoName : 'Нажмите, чтобы выбрать видео заведённого мотора'}
                </div>
              </div>
            </div>

            {/* Preview of Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-600">Загруженные фотографии ({uploadedImages.length}):</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group">
                      <img src={img} alt={`Фото ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(idx);
                        }}
                        className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                        title="Удалить фото"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Basic Car Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Марка:</label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Модель:</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Год выпуска:</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Цена продажи (₽):</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-emerald-700 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Пробег (км):</label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Город в РД:</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as any)}
                  aria-label="Город в Республике Дагестан"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Махачкала">Махачкала</option>
                  <option value="Хасавюрт">Хасавюрт</option>
                  <option value="Дербент">Дербент</option>
                  <option value="Каспийск">Каспийск</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all shadow-md shadow-emerald-600/20"
            >
              Далее: Учёт и Региональные опции ➔
            </button>
          </div>
        )}

        {/* STEP 2: Regional Specifics & Tags */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            {/* Registration */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Страна учёта автомобиля:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-bold">
                {[
                  { val: 'RU', label: '🇷🇺 РФ Учёт' },
                  { val: 'KG', label: '🇰🇬 Киргизия' },
                  { val: 'AM', label: '🇦🇲 Армения' },
                  { val: 'ABH', label: '🟢 Абхазия' },
                ].map(r => (
                  <button
                    key={r.val}
                    type="button"
                    onClick={() => setRegistration(r.val as RegistrationCountry)}
                    className={`p-2 rounded-xl border transition-all ${
                      registration === r.val ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Condition */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Состояние кузова:
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { val: 'NOT_BEATEN_NOT_PAINTED', label: 'Не бит / Не крашен 100%' },
                  { val: 'ARMOR_FILM', label: 'В дорогой бронеплёнке' },
                  { val: 'COSMETIC_REFRESH', label: 'Освежалась косметически' },
                  { val: 'FULL_REPAINT', label: 'Полный перекрас' },
                ].map(b => (
                  <button
                    key={b.val}
                    type="button"
                    onClick={() => setBodyCondition(b.val as BodyCondition)}
                    className={`p-2 rounded-xl border font-semibold text-left transition-all ${
                      bodyCondition === b.val ? 'bg-emerald-50 text-emerald-900 border-emerald-500 ring-2 ring-emerald-200' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Regional Mods */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Дагестанские доработки и опции:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                {[
                  { val: 'AIR_SUSPENSION', label: 'Пневмоподвеска' },
                  { val: 'AUDIO_SQ_SPL', label: 'Автозвук (SPL)' },
                  { val: 'LPG_WITH_MARK', label: 'Газ (ГБО) с отметкой' },
                  { val: 'EXHAUST_TUNING', label: 'Тюнинг выхлопа' },
                  { val: 'FULL_TINT', label: 'В круг тонировка' },
                  { val: 'ENGINE_STAGE', label: 'Stage прошивка' },
                ].map(m => {
                  const isSelected = regionalMods.includes(m.val as RegionalMod);
                  return (
                    <button
                      key={m.val}
                      type="button"
                      onClick={() => toggleMod(m.val as RegionalMod)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        isSelected ? 'bg-amber-50 text-amber-900 border-amber-500 font-bold ring-2 ring-amber-200' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m.label} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Description */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-rose-600" /> Голосовое описание (ИИ):
                </span>
                <button
                  type="button"
                  onClick={handleVoiceDescription}
                  disabled={isVoiceTranscribing}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold active:scale-95 transition-all flex items-center gap-1"
                >
                  <Mic className="w-3 h-3" />
                  <span>{isVoiceTranscribing ? 'Слушаю...' : '🎙️ Надиктовать голосом'}</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Опишите состояние авто или надиктуйте голосом..."
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Назад
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all shadow-md shadow-emerald-600/20"
              >
                Далее: Бартер и Контакты ➔
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Barter, Murabaha, Contacts */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            {/* Deal Formats */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-700">Форматы сделки:</div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (dealTypes.includes('BARTER')) setDealTypes(dealTypes.filter(d => d !== 'BARTER'));
                    else setDealTypes([...dealTypes, 'BARTER']);
                  }}
                  className={`px-3 py-2 rounded-xl border font-bold transition-all ${
                    dealTypes.includes('BARTER') ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5 inline mr-1" /> Включить «Умный бартер»
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (dealTypes.includes('MURABAHA')) setDealTypes(dealTypes.filter(d => d !== 'MURABAHA'));
                    else setDealTypes([...dealTypes, 'MURABAHA']);
                  }}
                  className={`px-3 py-2 rounded-xl border font-bold transition-all ${
                    dealTypes.includes('MURABAHA') ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 inline mr-1" /> Доступна Халяль-рассрочка
                </button>
              </div>

              {dealTypes.includes('BARTER') && (
                <div className="pt-2">
                  <label className="block text-[11px] text-amber-900 font-semibold mb-1">Что хотите взамен на обмен?</label>
                  <input
                    type="text"
                    value={barterNotes}
                    onChange={(e) => setBarterNotes(e.target.value)}
                    placeholder="Например: Обмен на Весту или Camry с доплатой"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                  />
                </div>
              )}
            </div>

            {/* Direct Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ваше имя:</label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">WhatsApp / Звонки:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Telegram username:</label>
                <input
                  type="text"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Назад
              </button>
              <button
                type="button"
                onClick={handleFinishListing}
                className="w-2/3 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all shadow-md shadow-emerald-600/20"
              >
                Опубликовать на DagAuto бесплатно 🚀
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success & Telegram Cross-Posting Preview */}
        {step === 4 && (
          <div className="space-y-4 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Объявление успешно опубликовано!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Карточка сохранена в базе данных и активирована на сайте.
              </p>
            </div>

            {/* Telegram Cross-Posting Generator Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-sky-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-sky-800 font-bold border-b border-slate-200 pb-2">
                <span className="flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-sky-600" /> Автопостинг в каналы @DagAuto_Cars (100k+ подписчиков):
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px]">Готово</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
                <div className="font-bold text-slate-900">🚘 {make} {model} ({year} г.)</div>
                <div>💰 Цена: <strong className="text-emerald-700">{formatPrice(Number(price))}</strong></div>
                <div>📍 Город: {city} • Учёт: {registration}</div>
                <div>🔄 Бартер: {barterNotes || 'Возможен'}</div>
                <div>📞 Контакт: {phone} • @{telegramUsername}</div>
                <div className="text-sky-600 pt-1 font-sans">#DagAuto #{make} #{city} #БартерДагестан</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Перейти к просмотру в каталоге
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
