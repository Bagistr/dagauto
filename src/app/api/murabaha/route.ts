import { NextResponse } from 'next/server';
import { calculateMurabaha, MurabahaCalculationInput } from '@/lib/murabahaCalculator';

// POST /api/murabaha - Server-side Islamic installment schedule calculation
export async function POST(request: Request) {
  try {
    const input: MurabahaCalculationInput = await request.json();

    if (!input.carPrice || !input.downPaymentPercent || !input.termMonths) {
      return NextResponse.json(
        { success: false, error: 'Укажите стоимость авто, взнос и срок рассрочки' },
        { status: 400 }
      );
    }

    const calculation = calculateMurabaha(input);

    return NextResponse.json({
      success: true,
      data: calculation,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка расчёта рассрочки' },
      { status: 500 }
    );
  }
}
