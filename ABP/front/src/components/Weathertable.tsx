import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getAllDados } from "@/services/dadoService";
import { baixarCSV } from "@/services/downloadservice";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

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
    if (!isLoggedIn) {
      alert("Você precisa estar logado para baixar o arquivo CSV.");
      return;
    }
    try {
      await baixarCSV();
    } catch (error) {
      alert("Erro ao baixar o arquivo CSV.");
    }
  }

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-border shadow shadow-muted bg-background text-foreground",
        className
      )}
    >
      <div className="p-4">
  <div className="relative group inline-block">
    <button
      onClick={handleDownload}
      disabled={!isLoggedIn}
      className={cn(
        "mb-4 rounded px-4 py-2 transition text-white",
        isLoggedIn
          ? "bg-primary hover:bg-primary/90"
          : "bg-muted text-muted-foreground cursor-not-allowed"
      )}
    >
      Download
    </button>

    {!isLoggedIn && (
      <span className="absolute left-1/2 -translate-x-1/2 mt-1 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Faça login para baixar o CSV
      </span>
    )}
  </div>
</div>

      <table className="min-w-full text-sm text-left text-foreground bg-background">
        <thead className="text-xs uppercase bg-muted text-muted-foreground">
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
        <tbody className="divide-y divide-border">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-3 font-medium whitespace-nowrap">
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
