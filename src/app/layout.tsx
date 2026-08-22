import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DagAuto 05 — Авторынок Дагестана | Продажа авто, Иностранный учёт, Бартер, Рассрочка",
  description: "Удобная автомобильная платформа Республики Дагестан. Продажа авто, калькулятор утильсбора и дотаможки (KG, AM, ABH), умный бартер, халяль-рассрочка Мурабаха и проверка проверенных СТО.",
  keywords: ["авторынок дагестан", "махачкала авто", "хасавюрт авторынок", "дотаможка киргизия", "абхазский учет", "умный бартер", "халяль рассрочка авто", "мурабаха дагестан"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
