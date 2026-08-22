import { NextResponse } from 'next/server';
import { calculateCustomsAndLegalization, CustomsCalculationInput } from '@/lib/customsCalculator';

// POST /api/customs - Server-side customs duty & recycling fee calculation
export async function POST(request: Request) {
  try {
    const input: CustomsCalculationInput = await request.json();

    if (!input.country || !input.engineVolume) {
      return NextResponse.json(
        { success: false, error: 'Укажите страну учёта и объём двигателя' },
        { status: 400 }
      );
    }

    const calculation = calculateCustomsAndLegalization(input);

    return NextResponse.json({
      success: true,
      data: calculation,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка расчёта таможенных пошлин' },
      { status: 500 }
    );
  }
}
