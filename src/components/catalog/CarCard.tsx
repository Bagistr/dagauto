'use client';

import React from 'react';
import { Car } from '@/types/car';
import { formatPrice, formatMileage, getRegistrationBadge } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onSelect,
}) => {
  const regBadge = getRegistrationBadge(car.registration.type);

  return (
    <div 
      onClick={() => onSelect(car)}
      className="group flex flex-col rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Photo */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        <img
          src={car.media.images[0]}
          alt={car.title}
          className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />

        {/* Small clean registration badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-slate-800 shadow-sm border border-slate-200 backdrop-blur-sm flex items-center gap-1.5">
            <span>{regBadge.flag}</span>
            <span>{regBadge.label}</span>
          </span>
        </div>

        {/* City tag */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-sm flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>{car.city}</span>
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatPrice(car.price)}
          </div>

          {/* Title and Year */}
          <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1 mt-0.5">
            {car.title}
          </h3>
        </div>

        {/* Mileage & Specs */}
        <div className="text-xs text-slate-500 font-medium pt-1">
          {car.year} г. • {formatMileage(car.mileage)} • {car.engineVolume}л • {car.transmission === 'AUTOMATIC' ? 'АКПП' : 'МКПП'}
        </div>
      </div>
    </div>
  );
};
