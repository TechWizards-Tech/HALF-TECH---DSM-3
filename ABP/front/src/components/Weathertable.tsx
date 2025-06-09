// src/components/WeatherTable.tsx
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getAllDados } from "@/services/dadoService";
import { baixarCSV } from "@/services/downloadservice";  // importar a função de download

interface DadoMeteorologico {
  reading_time: string;
  temp: number;
  hum: number;
  cab_temp: number;
  bat_volts: number;
  uv_level: number;
  bar: number;
  wind_peak: number;
  wind_rt: number;
  wind_avg: number;
  wind_dir_rt: number;
  wind_dir_avg: number;
}

interface WeatherTableProps {
  className?: string;
}

export default function WeatherTable({ className }: WeatherTableProps) {
  const [data, setData] = useState<DadoMeteorologico[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await getAllDados();
        setData(dados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  async function handleDownload() {
    try {
      await baixarCSV();
    } catch (error) {
      alert("Erro ao baixar o arquivo CSV.");
    }
  }

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-gray-500 shadow-md shadow-orange-500/50", className)}>
      <div className="p-4">
        <button
          onClick={handleDownload}
          className="mb-4 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition"
        >
          Download
        </button>
      </div>

      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3">Data do Registro</th>
            <th className="px-6 py-3">Temperatura do Ar (°C)</th>
            <th className="px-6 py-3">Umidade Relativa do Ar (%)</th>
            <th className="px-6 py-3">Temperatura da Cabine (°C)</th>
            <th className="px-6 py-3">Tensão da Bateria (V)</th>
            <th className="px-6 py-3">Irradiação Solar (W/m²)</th>
            <th className="px-6 py-3">Pressão Atmosférica (hPa)</th>
            <th className="px-6 py-3">Pico do Vento (m/s)</th>
            <th className="px-6 py-3">Intensidade do Vento (m/s)</th>
            <th className="px-6 py-3">Intensidade Média do Vento (m/s)</th>
            <th className="px-6 py-3">Direção do Vento (°)</th>
            <th className="px-6 py-3">Direção Média do Vento (°)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                {new Date(item.reading_time).toLocaleString("pt-BR")}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">{item.temp}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.hum}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.cab_temp}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.bat_volts}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.uv_level}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.bar}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.wind_peak}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.wind_rt}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.wind_avg}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.wind_dir_rt}</td>
              <td className="px-6 py-3 whitespace-nowrap">{item.wind_dir_avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
