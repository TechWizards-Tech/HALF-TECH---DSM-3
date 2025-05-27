// src/components/WeatherTable.tsx
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WeatherData {
  date: string;
  waveHeight: number;
  wavePeriod: number;
  windSpeed: number;
  windDirection: string;
  temperature: number;
  precipitation: number;
}

interface WeatherTableProps {
  className?: string;
  days?: number;
}

export default function WeatherTable({ className, days = 7 }: WeatherTableProps) {
  const [data, setData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const generateWeatherTableData = (days: number) => {
      const result = [];
      const today = new Date();

      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);

        result.push({
          date: date.toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
          waveHeight: Math.random() * 2 + 0.5,
          wavePeriod: Math.floor(Math.random() * 6) + 5,
          windSpeed: Math.floor(Math.random() * 30) + 10,
          windDirection: ["N", "NE", "L", "SE", "S", "SO", "O", "NO"][
            Math.floor(Math.random() * 8)
          ],
          temperature: Math.floor(Math.random() * 10) + 20,
          precipitation: Math.floor(Math.random() * 30),
        });
      }

      return result;
    };

    setData(generateWeatherTableData(days));
  }, [days]);

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-gray-500 shadow-md shadow-orange-500/50", className)}>
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3">Data</th>
            <th className="px-6 py-3">Altura da Onda (m)</th>
            <th className="px-6 py-3">Período da Onda (s)</th>
            <th className="px-6 py-3">Velocidade do Vento (km/h)</th>
            <th className="px-6 py-3">Direção do Vento</th>
            <th className="px-6 py-3">Temperatura (°C)</th>
            <th className="px-6 py-3">Precipitação (mm)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.waveHeight.toFixed(1)}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.wavePeriod}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.windSpeed}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.windDirection}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.temperature}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.precipitation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
