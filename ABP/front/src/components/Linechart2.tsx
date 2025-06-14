"use client";

import { useEffect, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getChartData } from "@/services/dadoService";

interface ApiData {
  [key: string]: any;
}

interface DataEntry {
  name: string;
  [key: string]: number | string;
}

// Variáveis disponíveis: as descrições que aparecem no objeto
const variaveisDisponiveis = [
  "Temp – Temperatura do ar (°C)",
  "Hum – Umidade relativa do ar (%)",
  "cab_temp – Temperatura da cabine (°C)",
  "bat_volts – Tensão da bateria (V)",
  "uv_level – Irradiação solar (w/m²)",
  "Bar – Pressão atmosférica (hPa)",
  "wind_peak – Pico de intensidade do vento (m/s)",
  "wind_rt – Intensidade do vento (m/s)",
  "wind_avg – Intensidade média do vento (m/s)",
  "wind_dir_rt – Direção do vento (°)",
  "wind_dir_avg – Direção média do vento (°)",
];

export default function Linechart2() {
  const [rawData, setRawData] = useState<ApiData[]>([]);
  const [data, setData] = useState<DataEntry[]>([]);
  const [varA, setVarA] = useState<string>("wind_rt – Intensidade do vento (m/s)");
  const [varB, setVarB] = useState<string>("wind_avg – Intensidade média do vento (m/s)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getChartData();
        console.log("Dados brutos da API:", apiData);
        setRawData(apiData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const formatted = rawData.map((item) => ({
      name: item["reading_time – Data do registro (AA-MM-DD HH:MM:SS)"] || "",
      varA: Number(item[varA]) || 0,
      varB: Number(item[varB]) || 0,
    }));
    setData(formatted);
  }, [rawData, varA, varB]);

  return (
    <Card className="p-4 rounded-2xl shadow-xl border-gray-500 shadow-zinc-500/50">
      <CardHeader>
        <CardTitle className="text-xl">Comparativo de Variáveis (Linha)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <div>
            <label htmlFor="varA" className="block font-medium mb-1">
              Variável A
            </label>
            <select
              id="varA"
              value={varA}
              onChange={(e) => setVarA(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {variaveisDisponiveis.map((desc) => (
                <option key={desc} value={desc}>
                  {desc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="varB" className="block font-medium mb-1">
              Variável B
            </label>
            <select
              id="varB"
              value={varB}
              onChange={(e) => setVarB(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {variaveisDisponiveis.map((desc) => (
                <option key={desc} value={desc}>
                  {desc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="varA"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="varB"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
