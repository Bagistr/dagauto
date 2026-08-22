import { NextResponse } from 'next/server';
import { MOCK_CARS } from '@/data/mockCars';
import { Car } from '@/types/car';

// In-memory data store for the backend API
let carsDb: Car[] = [...MOCK_CARS];

// GET /api/cars - List and filter cars from backend
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const make = searchParams.get('make');
  const registration = searchParams.get('registration');
  const maxPrice = searchParams.get('maxPrice');
  const barterOnly = searchParams.get('barter');

  let filtered = [...carsDb];

  if (city && city !== 'Все города') {
    filtered = filtered.filter(c => c.city === city);
  }

  if (make) {
    filtered = filtered.filter(c => c.make.toLowerCase() === make.toLowerCase());
  }

  if (registration) {
    filtered = filtered.filter(c => c.registration.type === registration);
  }

  if (maxPrice) {
    filtered = filtered.filter(c => c.price <= Number(maxPrice));
  }

  if (barterOnly === 'true') {
    filtered = filtered.filter(c => c.barter.acceptsBarter);
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}

// POST /api/cars - Create a new car listing in backend
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.price || !body.city || !body.seller?.phone) {
      return NextResponse.json(
        { success: false, error: 'Заполните обязательные поля: название, цена, город и телефон' },
        { status: 400 }
      );
    }

    const newCar: Car = {
      id: `car-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
    };

    carsDb.unshift(newCar);

    return NextResponse.json({
      success: true,
      message: 'Объявление успешно создано на сервере',
      data: newCar,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера при создании объявления' },
      { status: 500 }
    );
  }
}
