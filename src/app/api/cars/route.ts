import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MOCK_CARS } from '@/data/mockCars';
import { Car } from '@/types/car';

// In-memory fallback
let localCarsDb: Car[] = [...MOCK_CARS];

// GET /api/cars - Read cars from Supabase or Fallback
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const make = searchParams.get('make');
    const registration = searchParams.get('registration');

    // Try fetching from Supabase
    if (supabase) {
      let query = supabase.from('cars').select('*').order('created_at', { ascending: false });

      if (city && city !== 'Все города') {
        query = query.eq('city', city);
      }
      if (make) {
        query = query.eq('make', make);
      }
      if (registration && registration !== 'ALL') {
        query = query.eq('registration_type', registration);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        // Map database format to Car interface
        const formattedCars: Car[] = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          make: d.make,
          model: d.model,
          year: d.year,
          price: Number(d.price),
          mileage: d.mileage,
          engineVolume: Number(d.engine_volume),
          enginePower: d.engine_power,
          fuelType: d.fuel_type || 'PETROL',
          transmission: d.transmission || 'AUTOMATIC',
          drive: d.drive || 'FWD',
          color: d.color,
          city: d.city,
          registration: {
            type: d.registration_type,
            countryName: d.registration_country || 'РФ Учёт',
            flag: d.registration_type === 'KG' ? '🇰🇬' : d.registration_type === 'AM' ? '🇦🇲' : d.registration_type === 'ABH' ? '🟢' : '🇷🇺',
            isCustomsClearedRu: d.registration_type === 'RU',
            restrictionsRu: false,
            customsDetails: d.customs_details || '',
          },
          bodyCondition: d.body_condition || 'NOT_BEATEN_NOT_PAINTED',
          trimLevel: d.trim_level || 'NORMA',
          regionalMods: d.regional_mods || [],
          dealTypes: d.deal_types || ['SALE_ONLY'],
          media: {
            images: d.images && d.images.length > 0 ? d.images : ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1000&auto=format&fit=crop'],
            coldStartVideoUrl: d.cold_start_video_url,
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
            acceptsBarter: Boolean(d.accepts_barter),
            types: ['WITH_BUYER_SURCHARGE'],
            notes: d.barter_notes || '',
          },
          murabaha: {
            available: Boolean(d.murabaha_available),
            minDownPaymentPercent: 30,
            maxTermMonths: 36,
            partnerFunds: ['LARiba', 'MZHK'],
          },
          seller: {
            name: d.seller_name,
            phone: d.seller_phone,
            whatsappPhone: d.seller_whatsapp || d.seller_phone,
            telegramUsername: d.seller_telegram || '',
            isDealer: false,
            responseTimeMinutes: 5,
          },
          description: d.description || '',
          viewsCount: d.views_count || 1,
          createdAt: d.created_at ? d.created_at.split('T')[0] : '2024-08-23',
          isBoosted: Boolean(d.is_boosted),
        }));

        return NextResponse.json({
          success: true,
          source: 'supabase',
          total: formattedCars.length,
          data: formattedCars,
        });
      }
    }

    // Fallback to local memory / mock
    let filtered = [...localCarsDb];
    if (city && city !== 'Все города') filtered = filtered.filter(c => c.city === city);
    if (make) filtered = filtered.filter(c => c.make.toLowerCase() === make.toLowerCase());
    if (registration && registration !== 'ALL') filtered = filtered.filter(c => c.registration.type === registration);

    return NextResponse.json({
      success: true,
      source: 'local_cache',
      total: filtered.length,
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json({ success: true, source: 'fallback', total: localCarsDb.length, data: localCarsDb });
  }
}

// POST /api/cars - Create listing into Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.price || !body.city || !body.seller?.phone) {
      return NextResponse.json(
        { success: false, error: 'Заполните обязательные поля: название, цена, город и телефон' },
        { status: 400 }
      );
    }

    // Insert into Supabase if connected
    if (supabase) {
      const { data, error } = await supabase.from('cars').insert([{
        title: body.title,
        make: body.make,
        model: body.model,
        year: body.year,
        price: body.price,
        mileage: body.mileage,
        engine_volume: body.engineVolume,
        engine_power: body.enginePower,
        fuel_type: body.fuelType || 'PETROL',
        transmission: body.transmission || 'AUTOMATIC',
        drive: body.drive || 'FWD',
        color: body.color || 'Белый',
        city: body.city,
        registration_type: body.registration?.type || 'RU',
        registration_country: body.registration?.countryName || 'РФ Учёт',
        customs_details: body.registration?.customsDetails || '',
        body_condition: body.bodyCondition || 'NOT_BEATEN_NOT_PAINTED',
        trim_level: body.trimLevel || 'NORMA',
        regional_mods: body.regionalMods || [],
        deal_types: body.dealTypes || ['SALE_ONLY'],
        images: body.media?.images || [],
        cold_start_video_url: body.media?.coldStartVideoUrl || null,
        accepts_barter: body.barter?.acceptsBarter || false,
        barter_notes: body.barter?.notes || '',
        murabaha_available: body.murabaha?.available || false,
        seller_name: body.seller?.name || 'Продавец',
        seller_phone: body.seller?.phone,
        seller_whatsapp: body.seller?.whatsappPhone || body.seller?.phone,
        seller_telegram: body.seller?.telegramUsername || '',
        description: body.description || '',
      }]).select();

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          success: true,
          message: 'Объявление сохранено в базу данных Supabase',
          data: data[0],
        }, { status: 201 });
      }
    }

    // Fallback save to local store
    const newCar: Car = {
      id: `car-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
    };
    localCarsDb.unshift(newCar);

    return NextResponse.json({
      success: true,
      message: 'Объявление сохранено',
      data: newCar,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка сохранения' },
      { status: 500 }
    );
  }
}
