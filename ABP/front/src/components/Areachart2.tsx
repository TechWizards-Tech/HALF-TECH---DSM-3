"use client";

import { useEffect, useState } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChartData } from "@/services/dadoService";

interface DataEntry {
  name: string;
  varA: number;
  varB: number;
}

export default function Areachart2() {
  const [data, setData] = useState<DataEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getChartData();

        const formatted = apiData.map((item: any) => ({
          name: item.month,    // ajuste conforme os campos corretos
          varA: item.desktop,  // ajuste conforme seus dados
          varB: item.mobile,   // ajuste conforme seus dados
        }));

        setData(formatted);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="p-4 rounded-2xl shadow-md border-2 border-black shadow-zinc-500/50">
      <CardHeader>
        <CardTitle className="text-xl">Pico de velocidade/Média de velocidade (m/s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="varA"
                name="Pico do Vento"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.5}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="varB"
                name="Média do Vento"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.25}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
