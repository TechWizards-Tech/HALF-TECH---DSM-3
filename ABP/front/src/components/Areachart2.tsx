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
import { motion } from "framer-motion";

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

  // Estados para contagem de clicks no easter egg
  const [clickCount, setClickCount] = useState({ live: 0, "12h": 0, "3d": 0 });
  const [step, setStep] = useState(0); // 0 = espera live, 1 = espera 12h, 2 = espera 3d
  const [showDoom, setShowDoom] = useState(false);

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
    const root = getComputedStyle(document.documentElement);
    setColors({
      primary: root.getPropertyValue("--primary")?.trim() || "#8884d8",
      accent: root.getPropertyValue("--accent")?.trim() || "#82ca9d",
      grid: root.getPropertyValue("--muted")?.trim() || "#e5e7eb",
      text: root.getPropertyValue("--foreground")?.trim() || "#374151",
    });
  }, []);

  // Função para tratar o clique nos botões e controlar o easter egg
  function handleButtonClick(chartKey: ChartType) {
    // Atualiza o gráfico normalmente
    setActiveChart(chartKey);

    // Se o doom já está rodando, não processa o easter egg
    if (showDoom) return;

    if (step === 0 && chartKey === "live") {
      const newCount = clickCount.live + 1;
      setClickCount((prev) => ({ ...prev, live: newCount }));

      if (newCount === 6) {
        setStep(1); // Avança para próximo passo
      }
    } else if (step === 1 && chartKey === "12h") {
      const newCount = clickCount["12h"] + 1;
      setClickCount((prev) => ({ ...prev, "12h": newCount }));

      if (newCount === 6) {
        setStep(2); // Avança para próximo passo
      }
    } else if (step === 2 && chartKey === "3d") {
      const newCount = clickCount["3d"] + 1;
      setClickCount((prev) => ({ ...prev, "3d": newCount }));

      if (newCount === 6) {
        setShowDoom(true); // Ativa o DOOM
        setStep(0);
        setClickCount({ live: 0, "12h": 0, "3d": 0 });
      }
    } else {
      // Se clicar fora da ordem, reseta tudo
      setStep(0);
      setClickCount({ live: 0, "12h": 0, "3d": 0 });
    }
  }

  return (
    <>
      <Card className="p-4 rounded-2xl shadow shadow-muted border border-border bg-background text-foreground">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">
            Pico de velocidade / Média de velocidade (m/s)
          </CardTitle>

          <div className="flex gap-2">
            {[{ key: "live", label: "Live" }, { key: "12h", label: "4 horas" }, { key: "3d", label: "6 horas" }].map(
              ({ key, label }) => {
                const isActive = activeChart === key;
                return (
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    key={key}
                    onClick={() => handleButtonClick(key as ChartType)}
                    className={`px-4 py-1 rounded-md font-semibold transition-colors duration-200 border text-sm
                      ${
                        isActive
                          ? "bg-primary text-white border-primary shadow hover:bg-primary/80"
                          : "bg-muted text-muted-foreground hover:bg-muted/60 border-border"
                      }`}
                  >
                    {label}
                  </motion.button>
                );
              }
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart data={data}>
                <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={colors.text} />
                <YAxis
                  yAxisId="left"
                  stroke={colors.text}
                  tickFormatter={(value) => value.toFixed(2)}
                />
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

      {showDoom && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <iframe
            src="/js/jsdoom-main/index.html"
            style={{ flex: 1, border: "none" }}
            title="DOOM"
            allowFullScreen
          />
          <button
            onClick={() => setShowDoom(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10000,
              padding: "0.5em 1em",
              fontWeight: "bold",
              backgroundColor: "#f00",
              color: "#fff",
              border: "none",
              borderRadius: "0.3em",
              cursor: "pointer",
            }}
          >
            Fechar DOOM
          </button>
        </div>
      )}
    </>
  );
}
