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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getChartData,
  getChartDataLast12Hours,
  getChartDataLast3Days,
} from "@/services/dadoService";

interface DataEntry {
  name: string;
  varA: number;
  varB: number;
}

type ChartType = "live" | "12h" | "3d";

export default function Areachart2() {
  const [data, setData] = useState<DataEntry[]>([]);
  const [activeChart, setActiveChart] = useState<ChartType>("live");
  const [colors, setColors] = useState({
    primary: "#8884d8",
    accent: "#82ca9d",
    grid: "#e5e7eb",
    text: "#374151",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiData;

        if (activeChart === "live") {
          apiData = await getChartData();
        } else if (activeChart === "12h") {
          apiData = await getChartDataLast12Hours();
        } else {
          apiData = await getChartDataLast3Days();
        }

        const formatted = apiData.map((item: any) => ({
          name: item.month,
          varA: item.desktop,
          varB: item.mobile,
        }));

        setData(formatted);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [activeChart]);

  useEffect(() => {
    // Pega as cores do tema via CSS custom properties
    const root = getComputedStyle(document.documentElement);
    setColors({
      primary: root.getPropertyValue("--primary")?.trim() || "#8884d8",
      accent: root.getPropertyValue("--accent")?.trim() || "#82ca9d",
      grid: root.getPropertyValue("--muted")?.trim() || "#e5e7eb",
      text: root.getPropertyValue("--foreground")?.trim() || "#374151",
    });
  }, []);

  return (
    <Card className="p-4 rounded-2xl shadow shadow-muted border border-border bg-background text-foreground">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl">
          Pico de velocidade / Média de velocidade (m/s)
        </CardTitle>

        {/* Botões no canto superior direito */}
        <div className="flex gap-2">
          {[
            { key: "live", label: "Live" },
            { key: "12h", label: "4 horas" },
            { key: "3d", label: "6 horas" },
          ].map(({ key, label }) => {
            const isActive = activeChart === key;
            return (
              <button
                key={key}
                onClick={() => setActiveChart(key as ChartType)}
                className={`px-3 py-1 rounded-md font-semibold transition-colors
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={data}>
              <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke={colors.text} />
              <YAxis yAxisId="left" stroke={colors.text} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="varA"
                name="Pico do Vento"
                stroke={colors.primary}
                fill={colors.primary}
                fillOpacity={0.5}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="varB"
                name="Média do Vento"
                stroke={colors.accent}
                fill={colors.accent}
                fillOpacity={0.6}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
