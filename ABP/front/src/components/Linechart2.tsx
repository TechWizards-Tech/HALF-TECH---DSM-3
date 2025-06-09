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

import { getChartData } from "@/services/dadoService"; // ajuste o caminho conforme necessário

interface DataEntry {
  name: string;       // hora extraída do reading_time
  varA: number;       // wind_dir_avg
  varB: number;       // wind_dir_rt
}

export default function Linechart2() {
  const [data, setData] = useState<DataEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getChartData();

        // Opcional: se quiser formatar o nome da hora, já pode fazer aqui
        const formatted = apiData.map((item: any) => ({
          name: item.month, // que é hora no seu formato vindo do backend
          varA: item.desktop, // wind_dir_avg
          varB: item.mobile,  // wind_dir_rt
        }));

        setData(formatted);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="p-4 rounded-2xl shadow-xl border-gray-500 shadow-zinc-500/50">
      <CardHeader>
        <CardTitle className="text-xl">Comparativo de Variáveis (Linha)</CardTitle>
      </CardHeader>
      <CardContent>
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
